# Studio Kaku Website

Static website for [studio-kaku.com](https://studio-kaku.com) — built with Astro 5 + Tailwind CSS, editable via Slack + Claude Code.

---

## Architecture

```
Slack message
    │
    ▼
Slack Bot (Python, Socket Mode)
    │  uses Claude Code CLI
    ▼
Edits files on `staging` branch
    │
    ▼
GitHub Actions → staging.studio-kaku.com  ← preview here
    │
    │  /approve in Slack
    ▼
PR merged to `main`
    │
    ▼
GitHub Actions → studio-kaku.com  ← live site
```

---

## One-time setup

### 1. GitHub repository

```bash
git init
git remote add origin git@github.com:YOUR-ORG/studio-kaku.com.git
git checkout -b main
git push -u origin main

# Create the staging branch
git checkout -b staging
git push -u origin staging
```

Enable GitHub Pages on the **main** branch in *Settings → Pages*.

Create a second GitHub repository named `staging.studio-kaku.com` (also Pages-enabled on main).
Add a deploy key (SSH) from the main repo's secrets as `STAGING_DEPLOY_KEY`.

### 2. Custom domain DNS

Point `studio-kaku.com` and `staging.studio-kaku.com` to GitHub Pages:

```
studio-kaku.com          → GitHub Pages (A records or CNAME)
staging.studio-kaku.com  → GitHub Pages (CNAME to staging repo)
```

### 3. Install website dependencies

```bash
npm install
npm run build     # sanity check
npm run dev       # local preview at localhost:4321
```

### 4. Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → **From scratch**.
2. **Socket Mode** (Features → Enable Socket Mode) — generate an **App-Level Token** with `connections:write` scope. This is your `SLACK_APP_TOKEN`.
3. **OAuth & Permissions** → Bot Token Scopes:
   - `channels:history`, `channels:read`
   - `chat:write`
   - `files:read`
   - `reactions:write`
   - `users:read`
4. **Event Subscriptions** → Subscribe to bot events: `message.channels`
5. **Slash Commands** — create three commands:
   | Command | Description |
   |---------|-------------|
   | `/new` | Clear all active Claude sessions |
   | `/current` | Show bot status and staging URL |
   | `/approve` | Deploy staging → production |
6. Install the app to your workspace. Copy the **Bot User OAuth Token** → `SLACK_BOT_TOKEN`.

### 5. Slack bot

The bot machine needs **Claude Code CLI** installed and authenticated:

```bash
npm install -g @anthropic-ai/claude-code
claude login    # authenticate once
```

Clone the main repo **onto the bot machine** on the `staging` branch:

```bash
git clone -b staging git@github.com:YOUR-ORG/studio-kaku.com.git /path/to/repo
```

Configure environment:

```bash
cd slack-bot
cp .env.example .env
# Edit .env with your tokens and paths
```

Install Python dependencies (Python 3.11+):

```bash
pip install uv   # or: pip install -e .
uv run python -m bot
# or without uv:
pip install -e .
python -m bot
```

---

## Daily use (via Slack)

Post in the bot's channel and @-mention the bot to start a session:

> **@kaku** Update the homepage tagline to "Art, placed with intention."

The bot will edit the files, run `npm run build`, commit to staging, and reply with what changed.

To preview: visit **staging.studio-kaku.com**

To deploy to production:

> **/approve**

---

## Local development

```bash
npm run dev      # start Astro dev server at localhost:4321
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

---

## Placeholders to replace

- [ ] Logo / wordmark (update `Header.astro` and `public/favicon.svg`)
- [ ] Brand colours (update `tailwind.config.mjs` → `theme.extend.colors.brand`)
- [ ] Team names and bios (`src/pages/about.astro`)
- [ ] Photography / artwork images (replace placeholder `<div>` blocks with `<img>` tags)
- [ ] Formspree form ID (`src/pages/contact.astro` → `action` attribute)
- [ ] Instagram / social handles (`src/pages/contact.astro`)
- [ ] Email address (`src/pages/contact.astro`)
- [ ] Approved Slack user IDs in `slack-bot/.env` for `/approve` access
