# Lindsay Snyder website

Static multi-page site deployed as a Cloudflare Worker with static assets.

## Contact form setup

This site includes a contact form that submits to the Worker endpoint at `/api/contact`.

## Required Cloudflare Worker secrets / variables

In Cloudflare, open the Worker project and add these runtime values:

- `RESEND_API_KEY`
  - Your Resend API key
- `CONTACT_TO_EMAIL`
  - The inbox that should receive form submissions
  - Example: `LindsaySnyderSLP@gmail.com`
- `CONTACT_FROM_EMAIL`
  - A verified sender identity in Resend
  - Example: `website@yourdomain.com`

Recommended:
- store `RESEND_API_KEY` as a **secret**
- store `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` as variables or secrets

## Recommended email provider

Use [Resend](https://resend.com/) for the simplest Cloudflare-compatible setup.

Notes:
- `CONTACT_FROM_EMAIL` must be a sender/domain verified inside Resend.
- The form sets `reply_to` to the visitor's email so replies go back to them directly.
- If environment variables are missing, the API returns a configuration error instead of silently failing.

## Deployment

This repo is configured for a Cloudflare Worker deployment with static assets.

Key files:
- `worker.js` → Worker entrypoint
- `wrangler.json` → Worker config
- static HTML/CSS/assets served from repo root via Cloudflare assets binding

## Local editing

Any HTML/CSS/JS changes in this repo can be committed and pushed to GitHub. Cloudflare will auto-deploy from the connected branch.
