from __future__ import annotations
import os
from dataclasses import dataclass, field


@dataclass
class Config:
    # Slack
    slack_bot_token: str
    slack_app_token: str
    slack_channel_id: str

    # GitHub
    github_token: str
    github_repo: str          # e.g. "studio-kaku/studio-kaku.com"

    # Local filesystem
    repo_dir: str             # absolute path to the local git clone
    upload_dir: str           # where Slack file uploads are saved temporarily

    # Deployment
    staging_url: str = "https://staging.studio-kaku.com"

    # Access control
    approved_user_ids: list[str] = field(default_factory=list)

    # Claude
    claude_model: str = "sonnet"

    @classmethod
    def from_env(cls) -> "Config":
        repo_dir = os.environ["REPO_DIR"]
        return cls(
            slack_bot_token=os.environ["SLACK_BOT_TOKEN"],
            slack_app_token=os.environ["SLACK_APP_TOKEN"],
            slack_channel_id=os.environ["SLACK_CHANNEL_ID"],
            github_token=os.environ["GITHUB_TOKEN"],
            github_repo=os.environ["GITHUB_REPO"],
            repo_dir=repo_dir,
            upload_dir=os.path.join(repo_dir, "_uploads"),
            staging_url=os.environ.get("STAGING_URL", "https://staging.studio-kaku.com"),
            approved_user_ids=[
                uid.strip()
                for uid in os.environ.get("APPROVED_USER_IDS", "").split(",")
                if uid.strip()
            ],
            claude_model=os.environ.get("CLAUDE_MODEL", "sonnet"),
        )
