# Fit By Rob — Personal Training Website

A one-page, responsive website for Rob's personal training business. Built with React + Vite and plain CSS (no Tailwind).

## Tech stack

- React 19 + Vite
- Plain CSS (CSS custom properties for design tokens, one stylesheet per component)
- No UI framework — components are hand-built and easy to restyle

## Project structure

```
src/
  assets/images/       Logo (nav/footer) — not CMS-managed
  components/
    Navbar/            Sticky nav + mobile menu
    Popup/              Optional announcement popup (CMS-managed)
    Hero/               Hero section with headline and CTA
    Stats/              Stats bar under the hero
    About/              Rob's bio and focus areas
    Services/           Service cards
    Benefits/           "Why Train With Rob" section
    Testimonials/       Client results, testimonials, transformations
    ContactForm/         Inquiry form with validation
    Footer/              Footer with links and contact info
    shared/              Reusable pieces (e.g. PlaceholderImage)
  data/
    content.js          Re-exports the JSON files below — components
                         import from here and never touch the JSON directly
    content/*.json       <-- One file per section. Edit these directly, or
                         through the CMS at /admin (see below)
  utils/
    publicUrl.js         Resolves image paths against the app's base path
    scrollHighlight.js    Touch-device "centered card" highlight
  styles/
    tokens.css          Design tokens (colors, type, spacing)
    global.css          Base styles, resets, buttons
  App.jsx
  main.jsx
index.html              Page title, meta description, Open Graph tags
public/
  favicon.png           Site favicon (from the logo)
  uploads/               Hero/about photos + anything uploaded via the CMS
  admin/                 Decap CMS admin panel (config.yml + index.html)
```

### Updating content

All section content — Rob's bio, services, testimonials, contact details,
social links, the popup announcement — lives in JSON files under
**`src/data/content/`** (one file per section). `src/data/content.js`
imports and re-exports them, so components never change.

You can either edit those JSON files directly in code, or use the CMS at
**`/admin`** (see "Content management" below) — same underlying files,
just a form-based UI on top so Rob doesn't need to touch code.

Anything still marked `"Placeholder..."` or with a comment like `Replace
with client-provided information` should be swapped out once the real
information is available (e.g. real testimonials, confirmed email/phone,
confirmed social links, confirmation on whether online coaching is offered).

### Updating images

The nav/footer logo lives in `src/assets/images/` and is bundled normally
(swap the file and update the `import` in `Navbar.jsx`/`Footer.jsx`).

Hero/about photos, and any testimonial or before/after photos, live in
**`public/uploads/`** and are referenced by path in the JSON content files
(e.g. `"image": "uploads/rob-hero.jpg"`) — this is what lets the CMS
upload new photos without a code change. Components read these through
`publicUrl()` so the path resolves correctly on any host.

## Getting started

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install
npm run dev
```

This starts a local dev server (usually at `http://localhost:5173`) with
hot reload.

### Build for production

```bash
npm run build
```

Output goes to the `dist/` folder. Preview the production build locally with:

```bash
npm run preview
```

There are two build scripts — use the right one for the target host:

- **`npm run build`** — base path `/`. Use this for Netlify (or any host
  serving from a domain root).
- **`npm run build:ghpages`** — base path `/Fit-by-Rob-Website/`. Only
  for the GitHub Pages client-preview deploy, which is served from that
  subpath. Don't use this one for Netlify — it will break every asset URL.

## Content management (Decap CMS)

Rob can edit the site himself at **`/admin`** without touching code, using
[Decap CMS](https://decapcms.org) (the actively-maintained successor to
Netlify CMS). It's a static admin page (`public/admin/index.html` +
`config.yml`) — no server of ours to run or maintain. Edits save as real
commits to this repo's `main` branch, which triggers a normal Netlify
rebuild, so there's a full history and every change is revertible with git.

**How access is secured:** there's no separate password to manage. Logging
in requires a real GitHub account, and saving changes requires that
account to be a **collaborator on this repo**
(`Settings → Collaborators` on GitHub). Only add Rob's account (and
whoever else should be able to edit). Anyone else hitting `/admin` sees a
login screen and can't get past it — this is standard, and meaningfully
more secure than a password baked into a static site's frontend code ever
could be.

**One-time setup once the site is live on Netlify:**

1. Invite Rob as a collaborator on the `Sergi0987/Fit-by-Rob-Website`
   GitHub repo (or give him his own account if he doesn't have one).
2. That's it — the CMS backend (`base_url: https://api.netlify.com` in
   `config.yml`) uses Netlify's built-in OAuth relay for git-based CMS
   logins. It only works once the admin page is served from an actual
   Netlify-hosted domain (not from GitHub Pages) — Netlify validates the
   request comes from one of its own sites. No Netlify Identity, no extra
   OAuth app to register.
3. Rob visits `https://<your-netlify-domain>/admin`, clicks **Login**,
   authorizes with GitHub, and edits.

**What's editable:** the popup announcement, hero copy + photo, stats bar,
about bio + photo, services, benefits, testimonials (+ optional real
photos), before/after transformations (+ optional real photos), contact
details, and footer/social links. Nav labels and the contact form's
dropdown option lists are intentionally left out of the CMS since editing
those needs matching changes elsewhere in the app.

**Testing locally without GitHub auth:**

```bash
npm run dev          # in one terminal
npm run cms:local    # in another
```

Then visit `http://localhost:5173/admin/index.html` directly (note: on
Vite's dev server you need the explicit `index.html` — the bare `/admin/`
path only resolves automatically in a real production build/host). Decap
CMS detects `localhost` and offers a local-backend login that reads/writes
your working directory directly, no GitHub account needed for testing.

## Popup announcements

Toggle **"Show popup on the site"** in the CMS (or `enabled` in
`src/data/content/announcement.json`) to show a dismissible popup with a
heading, message, and optional button — for specials, events, or seasonal
offers. It appears once per visitor per announcement (tracked in
`localStorage`); changing the heading or message counts as a new
announcement and will show again even to visitors who dismissed a
previous one.

## Setting up the contact form

The inquiry form is built to submit to **[Formspree](https://formspree.io)**
by default, but works with any static-form service. The endpoint is read
from an environment variable so no keys are stored in the source code.

### Option A: Formspree (default, recommended for simplicity)

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form and copy its endpoint URL (looks like
   `https://formspree.io/f/abcd1234`).
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Set the endpoint in `.env`:
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/abcd1234
   ```
5. Restart the dev server if it's running. Submissions will now email
   directly to the address you configured in Formspree.

### Option B: Web3Forms

1. Get a free access key at [web3forms.com](https://web3forms.com).
2. Set `VITE_FORM_ENDPOINT=https://api.web3forms.com/submit` in `.env`.
3. Because Web3Forms requires the access key in the submitted payload,
   open `src/components/ContactForm/ContactForm.jsx` and add
   `access_key: import.meta.env.VITE_WEB3FORMS_KEY` to the submitted
   `values` object, and add `VITE_WEB3FORMS_KEY=your-access-key` to `.env`.

### Option C: EmailJS

EmailJS works a little differently (it uses a JS SDK rather than a plain
POST endpoint). If you'd prefer EmailJS:

1. Install the SDK: `npm install @emailjs/browser`.
2. Create a service + template at [emailjs.com](https://www.emailjs.com).
3. Replace the `fetch` call in `handleSubmit` (in `ContactForm.jsx`) with
   an `emailjs.send()` call, using service ID, template ID, and public key
   stored in `.env` (`VITE_EMAILJS_SERVICE_ID`, etc).

**Never commit your real `.env` file.** It's already excluded via
`.gitignore`. Only `.env.example` (with blank values) should be committed.

If `VITE_FORM_ENDPOINT` isn't set, the form will show a clear message
telling the visitor (and you) that the form isn't configured yet, rather
than silently failing.

## Deployment

This is a static site — the build output in `dist/` can be hosted anywhere
that serves static files. Common options:

### Netlify / Vercel (recommended, easiest)

1. Push this project to a GitHub repository.
2. Import the repo in [Netlify](https://netlify.com) or
   [Vercel](https://vercel.com).
3. Build command: `npm run build`. Output directory: `dist`.
4. Add your environment variable(s) (e.g. `VITE_FORM_ENDPOINT`) in the
   site's dashboard under Environment Variables — do **not** put real
   values in a committed `.env` file.

### Any static host

Run `npm run build`, then upload the contents of `dist/` to your host
(e.g. an S3 bucket, GitHub Pages, or traditional web hosting via FTP).
Remember to set the form endpoint as a build-time environment variable
before running `npm run build`, since Vite bakes `VITE_*` variables into
the build at build time.

## Accessibility & performance notes

- Semantic HTML landmarks (`header`, `main`, `footer`, `nav`) throughout.
- Visible keyboard focus styles on all interactive elements.
- Form fields have associated labels and `aria-describedby` error messages.
- Respects `prefers-reduced-motion` (animations are disabled for users who
  request reduced motion).
- Images are resized and compressed for web delivery; the hero image uses
  `fetchpriority="high"` and other images lazy-load.
- A "Skip to main content" link is available for keyboard/screen reader users.
