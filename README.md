# Lindsay Snyder website

Static multi-page site for deployment on Cloudflare Pages.

## Contact form setup

This site includes a contact form that submits to a Cloudflare Pages Function at `/api/contact`.

### Required Cloudflare Pages environment variables

Add these in Cloudflare Pages project settings under **Settings → Environment variables**:

- `RESEND_API_KEY`
  - Your Resend API key.
- `CONTACT_TO_EMAIL`
  - The inbox that should receive form submissions.
  - Example: `LindsaySnyderSLP@gmail.com`
- `CONTACT_FROM_EMAIL`
  - A verified sender identity in Resend.
  - Example: `website@yourdomain.com`

### Recommended email provider

Use [Resend](https://resend.com/) for the simplest Cloudflare-compatible setup.

Notes:
- `CONTACT_FROM_EMAIL` must be a sender/domain verified inside Resend.
- The form sets `reply_to` to the visitor's email so replies go back to them directly.
- If environment variables are missing, the API returns a configuration error instead of silently failing.

## Deployment

Cloudflare Pages settings:
- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`

## Local editing

Any HTML/CSS/JS changes in this repo can be committed and pushed to GitHub. Cloudflare Pages will auto-deploy from the connected branch.
