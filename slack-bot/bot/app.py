"""Studio Kaku Slack bot — bridges Slack with Claude Code for website editing."""
from __future__ import annotations

import logging
import os
import re
from pathlib import Path
from typing import Any

import aiohttp
from slack_bolt.adapter.socket_mode.async_handler import AsyncSocketModeHandler
from slack_bolt.async_app import AsyncApp

from bot.claude import ClaudeSession
from bot.config import Config
from bot.github import create_upstream_pr

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
log = logging.getLogger(__name__)

# One ClaudeSession per Slack thread (keyed by thread_ts)
sessions: dict[str, ClaudeSession] = {}


# ── App setup ─────────────────────────────────────────────────────────────────

def create_app(config: Config) -> AsyncApp:
    app = AsyncApp(token=config.slack_bot_token)

    # ── Helpers ───────────────────────────────────────────────────────────────

    def _get_or_create_session(thread_ts: str) -> ClaudeSession:
        if thread_ts not in sessions:
            sessions[thread_ts] = ClaudeSession(
                repo_dir=config.repo_dir,
                staging_url=config.staging_url,
                model=config.claude_model,
            )
        return sessions[thread_ts]

    async def react(client: Any, channel: str, ts: str, emoji: str) -> None:
        try:
            await client.reactions_add(channel=channel, timestamp=ts, name=emoji)
        except Exception:
            pass

    async def unreact(client: Any, channel: str, ts: str, emoji: str) -> None:
        try:
            await client.reactions_remove(channel=channel, timestamp=ts, name=emoji)
        except Exception:
            pass

    def to_slack_mrkdwn(text: str) -> str:
        """Convert basic Markdown to Slack mrkdwn."""
        text = re.sub(r"\*\*(.+?)\*\*", r"*\1*", text)           # bold
        text = re.sub(r"^#{1,3}\s+(.+)$", r"*\1*", text, flags=re.MULTILINE)  # headings
        text = re.sub(r"\[(.+?)\]\((.+?)\)", r"<\2|\1>", text)   # links
        return text

    def truncate(text: str, limit: int = 3000) -> str:
        if len(text) <= limit:
            return text
        return text[: limit - 3] + "..."

    async def get_display_name(client: Any, user_id: str) -> str:
        try:
            info = await client.users_info(user=user_id)
            profile = info["user"]["profile"]
            return profile.get("display_name") or profile.get("real_name", user_id)
        except Exception:
            return user_id

    def in_bot_channel(event: dict) -> bool:
        return event.get("channel") == config.slack_channel_id

    async def resolve_file_info(client: Any, file: dict) -> dict:
        """Fetch full file metadata if Slack sent a tombstone."""
        if file.get("file_access") == "visible":
            return file
        try:
            resp = await client.files_info(file=file["id"])
            return resp["file"]
        except Exception:
            return file

    async def download_slack_file(url: str, dest: Path) -> None:
        headers = {"Authorization": f"Bearer {config.slack_bot_token}"}
        async with aiohttp.ClientSession() as http:
            async with http.get(url, headers=headers) as resp:
                resp.raise_for_status()
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_bytes(await resp.read())

    # ── Message handler ───────────────────────────────────────────────────────

    @app.event("message")
    async def handle_message(event: dict, client: Any, say: Any) -> None:
        if not in_bot_channel(event):
            return

        subtype = event.get("subtype")
        # Allow file_share; skip other subtypes (edits, deletes, etc.)
        if subtype and subtype != "file_share":
            return

        # Skip bot messages
        if event.get("bot_id"):
            return

        text: str = event.get("text", "") or ""
        user_id: str = event.get("user", "")
        ts: str = event.get("ts", "")
        thread_ts: str = event.get("thread_ts", ts)

        bot_user_id = (await client.auth_test())["user_id"]
        mentioned = f"<@{bot_user_id}>" in text

        # Only start a new session if the bot is @-mentioned; continue existing ones
        if thread_ts not in sessions and not mentioned:
            return

        session = _get_or_create_session(thread_ts)

        if session.is_busy:
            await say(
                text="I'm still working on the last request — hang tight!",
                thread_ts=thread_ts,
            )
            return

        # Strip the @mention from the message
        clean_text = text.replace(f"<@{bot_user_id}>", "").strip()

        # Handle file uploads
        upload_note = ""
        for file in event.get("files", []):
            full = await resolve_file_info(client, file)
            url = full.get("url_private_download") or full.get("url_private", "")
            if url:
                filename = full.get("name", full["id"])
                dest = Path(config.upload_dir) / filename
                try:
                    await download_slack_file(url, dest)
                    upload_note += f"\nFile saved to: {dest}"
                    log.info("Downloaded %s → %s", filename, dest)
                except Exception as exc:
                    log.error("File download failed: %s", exc)

        if not clean_text and not upload_note:
            return

        message = clean_text + upload_note
        display_name = await get_display_name(client, user_id)
        log.info("[%s] %s: %s", thread_ts, display_name, message[:120])

        await react(client, event["channel"], ts, "hourglass_flowing_sand")

        try:
            reply = await session.send(message)
            await unreact(client, event["channel"], ts, "hourglass_flowing_sand")
            await react(client, event["channel"], ts, "white_check_mark")
            await say(
                text=truncate(to_slack_mrkdwn(reply)),
                thread_ts=thread_ts,
            )
        except Exception as exc:
            log.exception("Claude error: %s", exc)
            await unreact(client, event["channel"], ts, "hourglass_flowing_sand")
            await react(client, event["channel"], ts, "x")
            await say(
                text=f"Something went wrong: `{exc}`",
                thread_ts=thread_ts,
            )

    # ── Slash commands ────────────────────────────────────────────────────────

    @app.command("/new")
    async def cmd_new(ack: Any, respond: Any) -> None:
        await ack()
        count = len(sessions)
        sessions.clear()
        await respond(f"Cleared {count} active session(s). Fresh start!")

    @app.command("/current")
    async def cmd_current(ack: Any, respond: Any) -> None:
        await ack()
        busy = sum(1 for s in sessions.values() if s.is_busy)
        text = (
            f"*Active sessions:* {len(sessions)}\n"
            f"*Busy:* {busy}\n"
            f"*Staging:* {config.staging_url}"
        )
        await respond(text)

    @app.command("/approve")
    async def cmd_approve(ack: Any, respond: Any, command: dict) -> None:
        await ack()
        user_id = command.get("user_id", "")

        if config.approved_user_ids and user_id not in config.approved_user_ids:
            await respond("Sorry, you're not authorised to deploy to production.")
            return

        await respond("Creating a PR from staging → main... one moment.")
        try:
            pr = await create_upstream_pr(
                token=config.github_token,
                repo=config.github_repo,
                auto_merge=True,
            )
            if pr:
                await respond(
                    f"Deployed! PR <{pr['html_url']}|#{pr['number']}> merged to main.\n"
                    f"The live site will update shortly: https://studio-kaku.com"
                )
            else:
                await respond("Couldn't create or find the PR — check the repo manually.")
        except Exception as exc:
            log.exception("Deploy error: %s", exc)
            await respond(f"Deploy failed: `{exc}`")

    return app


# ── Entry point ───────────────────────────────────────────────────────────────

async def main() -> None:
    config = Config.from_env()
    os.makedirs(config.upload_dir, exist_ok=True)

    app = create_app(config)
    handler = AsyncSocketModeHandler(app, config.slack_app_token)

    log.info("Studio Kaku bot starting (staging: %s)", config.staging_url)
    await handler.start_async()
