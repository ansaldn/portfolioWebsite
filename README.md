# davidansa.com — portfolio

Personal consulting portfolio for David Ansa (cybersecurity · IAM · cloud).
React + TypeScript + Vite, hosted on AWS (S3 + CloudFront + WAF) and deployed
via GitHub Actions on push to `main`.

- **Infrastructure & deployment:** see [`INFRA.md`](./INFRA.md)
- **Security model & review:** see [`SECURITY.md`](./SECURITY.md)

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run lint
```

The site has light and dark themes (it follows the visitor's OS setting on a
first visit, with a toggle in the header) and these pages: Home, Clients,
Services, **For business** (`/business`), **Book a call** (`/engage`), and
Contact.

## Enable the forms & booking

Everything works out of the box in a **demo mode** (the contact form falls back
to a mailto link, the engagement form uses Cloudflare's "always passes" test
CAPTCHA, and the booking step shows a mailto fallback). To switch to live
behaviour, set the environment variables below. All of them are **public**
values baked into the client bundle — never put a secret key in a `VITE_*`
variable.

Copy `.env.example` to `.env` for local testing, and set the same keys as
GitHub **repository variables** (Settings → Secrets and variables → Actions →
*Variables*) so production builds pick them up.

### 1. Forms — Formspree (`VITE_FORMSPREE_ENDPOINT`)

1. Sign up free at [formspree.io](https://formspree.io) and create a form.
2. Copy its endpoint URL, e.g. `https://formspree.io/f/abcdwxyz`.
3. Set `VITE_FORMSPREE_ENDPOINT` to that URL.
4. Activate the form: a brand-new Formspree form needs you to confirm it via
   the email Formspree sends on its first submission, otherwise posts fail.
5. **Leave Formspree's reCAPTCHA OFF.** Formspree's reCAPTCHA is incompatible
   with AJAX/`fetch` submissions (it causes `403` errors) and is redundant
   here — the page already gates with Cloudflare Turnstile + a honeypot. Use
   Formspree's other (AJAX-safe) spam filtering if you want extra coverage.
6. If you restrict the form to specific domains in Formspree, include
   `davidansa.com`, `www.davidansa.com`, and `localhost` (for local testing).

### 2. CAPTCHA — Cloudflare Turnstile (`VITE_TURNSTILE_SITE_KEY`)

1. In the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)
   → Turnstile → **Add widget**.
2. Add your domains: `davidansa.com`, `www.davidansa.com`, and `localhost`
   for local testing.
3. Copy the **Site key** (public) into `VITE_TURNSTILE_SITE_KEY`.
4. Keep the **Secret key** safe — it is *not* used in the client. See the
   note in `SECURITY.md` about server-side verification if you want the
   CAPTCHA to be a hard, enforced gate.

### 3. Booking — Google Calendar (`VITE_GCAL_EMBED_URL`)

1. In [Google Calendar](https://calendar.google.com) → **Create** →
   **Appointment schedule**. Set your availability, meeting length, etc.
2. Open the schedule → **Share** / **Open booking page**, then use the
   **embed** option to get the iframe code.
3. Copy the `src` URL from that iframe (it looks like
   `https://calendar.google.com/calendar/appointments/schedules/AcZ...?gv=true`).
4. Set `VITE_GCAL_EMBED_URL` to that URL.

> The booking calendar only appears **after** a visitor fills the engagement
> form and passes the Turnstile check, so it's gated by real details + CAPTCHA.

### 4. (Optional) Auth0

`VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` enable the Auth0 SPA flow for any
future gated/CIAM content. The site renders fine without them.

## Deploy

Push to `main`. GitHub Actions builds and deploys to AWS automatically
(see `INFRA.md`). The CSP allows the three integrations above
(`formspree.io`, `challenges.cloudflare.com`, `calendar.google.com`); if you
add another third-party service, update the CSP in both `index.html` and
`infra/cloudfront.tf`.
