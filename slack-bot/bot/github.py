"""GitHub API helpers for the staging → main deploy workflow."""
from __future__ import annotations

import logging

import httpx

log = logging.getLogger(__name__)

GITHUB_API = "https://api.github.com"


async def create_upstream_pr(
    token: str,
    repo: str,
    *,
    auto_merge: bool = False,
) -> dict:
    """
    Open (or find) a PR from staging → main, optionally auto-merge it.

    Returns the PR URL.
    """
    pr = await _create_or_find_pr(token, repo)
    if auto_merge and pr:
        await _merge_pr(token, repo, pr["number"])
    return pr


async def _create_or_find_pr(token: str, repo: str) -> dict:
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    payload = {
        "title": "Deploy: staging → main",
        "head": "staging",
        "base": "main",
        "body": (
            "This PR was created automatically by the Studio Kaku Slack bot.\n\n"
            "Review the staging site before merging:\n"
            "https://staging.studio-kaku.com"
        ),
    }

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{GITHUB_API}/repos/{repo}/pulls",
            headers=headers,
            json=payload,
        )

    if resp.status_code == 201:
        pr = resp.json()
        log.info("Created PR #%s: %s", pr["number"], pr["html_url"])
        return pr

    if resp.status_code == 422:
        # PR already exists or no commits between branches
        body = resp.json()
        errors = body.get("errors", [])
        for err in errors:
            if "already exists" in err.get("message", ""):
                return await _find_existing_pr(token, repo)
        log.warning("Could not create PR (422): %s", body)
        return {}

    log.error("GitHub error %s: %s", resp.status_code, resp.text)
    return {}


async def _find_existing_pr(token: str, repo: str) -> dict:
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{GITHUB_API}/repos/{repo}/pulls",
            headers=headers,
            params={"head": f"{repo.split('/')[0]}:staging", "base": "main", "state": "open"},
        )
    if resp.status_code == 200:
        prs = resp.json()
        if prs:
            pr = prs[0]
            log.info("Found existing PR #%s: %s", pr["number"], pr["html_url"])
            return pr
    return {}


async def _merge_pr(token: str, repo: str, pr_number: int) -> None:
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    async with httpx.AsyncClient() as client:
        resp = await client.put(
            f"{GITHUB_API}/repos/{repo}/pulls/{pr_number}/merge",
            headers=headers,
            json={"commit_message": "Deploy: merge staging to main"},
        )
    if resp.status_code == 200:
        log.info("Merged PR #%s", pr_number)
    else:
        log.error("Merge failed %s: %s", resp.status_code, resp.text)
