"""Wrapper around the Claude Code CLI (`claude`) for website editing sessions."""
from __future__ import annotations

import asyncio
import json
import logging
import os
import subprocess
from typing import Any

log = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are helping edit the Studio Kaku website via Slack.

Studio Kaku is a London-based art services studio with two specialisms:
1. Framing, installation and art care
2. Art consultancy, creative direction and curation

When someone asks you to make a change, do it — then explain what you changed
in plain, friendly English (no technical jargon). Keep your reply to 2-3
sentences at most.

After making changes:
- Always run `npm run build` to check for errors.
- Commit to the `staging` branch with a short, descriptive message.
- Mention the staging URL ({staging_url}) so the team can preview changes.

Never merge to `main` yourself. That happens via /approve in Slack.
"""


class ClaudeSession:
    """Manages a persistent Claude Code CLI session for a single Slack thread."""

    def __init__(self, repo_dir: str, staging_url: str, model: str = "sonnet") -> None:
        self.repo_dir = repo_dir
        self.staging_url = staging_url
        self.model = model
        self._session_id: str | None = None
        self._lock = asyncio.Lock()
        self.is_busy = False

    async def send(self, message: str) -> str:
        """Send a message and return Claude's text response."""
        async with self._lock:
            self.is_busy = True
            try:
                return await self._invoke(message)
            finally:
                self.is_busy = False

    async def _invoke(self, message: str) -> str:
        # Prepend the system prompt to the message so Claude has full context.
        # (--system flag not supported in all Claude Code versions; CLAUDE.md also provides context)
        full_message = SYSTEM_PROMPT.format(staging_url=self.staging_url) + "\n\n" + message
        cmd = [
            "claude",
            "--model", self.model,
            "--output-format", "json",
            "--dangerously-skip-permissions",
            "-p", full_message,
        ]
        if self._session_id:
            cmd += ["--resume", self._session_id]

        env = {k: v for k, v in os.environ.items() if k != "CLAUDECODE"}

        log.info("Invoking claude: %s", " ".join(cmd[:6]))

        proc = await asyncio.create_subprocess_exec(
            *cmd,
            cwd=self.repo_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=env,
        )
        stdout, stderr = await proc.communicate()

        log.info("claude exit code: %s", proc.returncode)
        if stderr:
            log.info("claude stderr: %s", stderr.decode()[:500])

        raw = stdout.decode().strip()
        log.info("claude raw output: %s", raw[:500])

        try:
            data: dict[str, Any] = json.loads(raw)
        except json.JSONDecodeError:
            log.error("Claude returned non-JSON: %s", raw[:500])
            return raw or "_(no response)_"

        # Capture session ID for resumption
        if session_id := data.get("session_id"):
            self._session_id = session_id

        if cost := data.get("cost_usd"):
            log.info("Claude cost: $%.4f", cost)

        result = data.get("result", "").strip()
        log.info("Claude result: %s", result[:200])
        return result or "_(no response)_"

    def reset(self) -> None:
        """Clear the session so the next message starts fresh."""
        self._session_id = None
