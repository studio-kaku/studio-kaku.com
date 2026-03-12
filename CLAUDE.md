# Studio Kaku Website — AI Agent Guide

You are editing the Studio Kaku website, a static Astro 5 site served at **studio-kaku.com**.

## Workflow rules

- **Always work on the `staging` branch.** Never commit directly to `main`.
- Run `npm run build` before committing to catch errors.
- Keep responses concise and non-technical — your audience includes non-developers.
- After making changes, summarise what you changed in plain English.
- **Always verify visual changes using the Chrome extension before reporting back.** After editing code, hard-reload the browser (`cmd+shift+r`) and use the Chrome extension to confirm the change is live — either via screenshot or by checking computed styles with JavaScript. Only report success once the change is confirmed in the browser.

## Deployment pipeline

| Branch | Site | How to deploy |
|--------|------|---------------|
| `staging` | staging.studio-kaku.com | Push to `staging` — GitHub Actions builds automatically |
| `main` | studio-kaku.com | Use `/approve` in Slack — creates & merges a PR from staging→main |

## Repository structure

```
src/
  layouts/Layout.astro     # Main HTML shell (head, header, footer)
  components/
    Header.astro           # Site navigation
    Footer.astro           # Footer with copyright
  pages/
    index.astro            # Home page
    services.astro         # Services (framing + consultancy)
    about.astro            # Team & mission
    contact.astro          # Contact form & info
public/
  favicon.svg              # Site icon (SK monogram placeholder)
tailwind.config.mjs        # Design tokens & brand colours
```

## Design system

All design tokens are in `tailwind.config.mjs` under `theme.extend.colors.brand`:

| Token | Purpose | Current value (placeholder) |
|-------|---------|------------------------------|
| `brand-bg` | Page background | `#FAFAF8` warm white |
| `brand-text` | Primary text | `#1C1C1C` near-black |
| `brand-muted` | Secondary text | `#8A8A8A` grey |
| `brand-accent` | Highlight / bullet | `#B5A694` warm taupe |
| `brand-border` | Dividers / outlines | `#E5E3DF` |

**Typography:** `font-serif` (Georgia) for headings, `font-sans` (system-ui) for body.

When brand colours and fonts are confirmed, update `tailwind.config.mjs` — all pages inherit automatically.

## Content conventions

- Page titles use `font-serif text-4xl` for the `<h1>`.
- Section subtitles use `text-brand-muted text-sm tracking-widest uppercase`.
- Body copy uses `text-brand-muted leading-relaxed`.
- Image placeholders are `<div class="bg-brand-border ...">Image placeholder</div>` — replace with real `<img>` tags when assets are ready.
- The contact form POSTs to Formspree — update the action URL in `contact.astro` with the real form ID.

## Running the dev server

To start the dev server in the background:

```
pnpm run dev &
```

Do **not** use the Bash tool's `run_in_background` parameter — it exits after capturing initial output and kills the process. Use `&` like a normal Unix command.

## Technology constraints

- No Svelte, middleware, SSR or view transitions.
- `.astro` files only for layout and pages; keep logic minimal.
- Do not add new npm packages without checking with the team.
- Run `npm run build` before every commit.
