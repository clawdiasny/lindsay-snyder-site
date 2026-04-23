# MEMORY.md – Clawdia’s Long-Term Memory

## About Cortlon
- Name: Cortlon Snyder
- Prefers to be called: Cortlon
- Timezone: America/New_York
- Runs OpenClaw on a Mac mini; uses both Control UI and Telegram as front-ends.

## Communication & Preferences
- Likes direct, competent answers with minimal fluff.
- Comfortable with technical setup (gateway, API keys, config) and wants things wired up properly, not half-working.
- Enjoys a bit of personality/humor (e.g., lobster/claw theme) as long as it doesn’t get in the way of usefulness.
- Uses Telegram heavily for quick checks and wants important briefs/alerts routed there.

## Assistant Identity
- Assistant name: Clawdia (OpenClaw main agent).
- Role: Personal AI assistant with access to local workspace, focused on being genuinely helpful, not performative.
- Default tone: Direct, information-dense, non-sycophantic.

## OpenClaw Setup
- Gateway: running locally on Mac mini; dashboard reachable on 127.0.0.1:18789.
- Main agent access: connected to OpenAI Codex by auth, not by manually configured API key.
- Host hardware: Mac mini with 8GB RAM.
- Practical guardrail: keep Cortlon honest about local compute limits on this machine, and flag plans that are likely too heavy for 8GB RAM, especially attempts to run larger local models like Gemma.
- Channels:
  - Control UI / webchat: primary for deep work (files, cron jobs, configuration).
  - Telegram (ID: 8733154826): used for daily briefs and notifications.

## Routines & Automations
- Daily market brief:
  - Cron job `daily-market-brief` runs at 10:00 AM Mon–Fri (America/New_York).
  - Delivers a concise market/macro/NEE/BTC-USD oriented summary as a Telegram message.
  - Briefs must clearly label stock/crypto prices as approximate, not live, and include links to key sources for further research.
- Website concierge redesign notification:
  - Cron job `notify-when-clawdia-html-ready` checks for `clawdia.html` (concierge/luxury homepage variant).
  - When ready, it should notify Cortlon via Telegram that `clawdia.html` is available in the workspace and not yet deployed.

## Projects (Ongoing)
- **Website – Concierge SLP Version**
  - Existing site: `index.html` describes Lindsay Snyder’s adult neurocognitive speech-language practice.
  - New task: research high-end / concierge speech-language and adjacent boutique healthcare sites to design a more luxury/concierge version of the homepage as `clawdia.html`.
  - Goals: emphasize high-touch, calm, premium experience while staying clinically grounded and adult-focused.
  - Status: research and design work in progress; `clawdia.html` not yet created as of 2026-03-25 evening.
- **Website workflow instruction**
  - Any time Cortlon wants to work on the website, reference `Website.md` for the workflow and publishing rules first.

## Principles for Future Work
- Never fabricate precise, live financial quotes; when giving approximate prices, label them clearly as approximate/delayed.
- Include direct source links when surfacing external research so Cortlon can quickly dive deeper.
- Prefer Telegram for timely alerts; use Control UI for heavier context and configuration.
- When new recurring workflows are created (like daily briefs), document them here so they’re easy to remember and adjust later.
- For local music/event discovery, maintain the watchlist in `state/local-music-watchlist.json` and prefer verified venue pages plus public event sources over Facebook.
- The `Clawdia` calendar should become a curated around-town calendar for concerts, seafood festivals, green markets, art festivals, and other worthwhile local things to do across Martin and Palm Beach counties.
- For web event research, if Ollama fetch/search is weak or fails, fall back to Brave search or stronger alternate public sources.
- Never add events to the calendar if they have already happened.
