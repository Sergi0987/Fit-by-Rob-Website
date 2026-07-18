# Fit By Rob — Personal Training Website

A one-page, responsive website for Rob's personal training business. Built with React + Vite and plain CSS (no Tailwind).

## Tech stack

- React 19 + Vite
- Plain CSS (CSS custom properties for design tokens, one stylesheet per component)
- No UI framework — components are hand-built and easy to restyle

## Project structure

```
src/
  assets/images/       Photos and logo
  components/
    Navbar/            Sticky nav + mobile menu
    Hero/               Hero section with headline and CTA
    About/              Rob's bio and focus areas
    Services/           Service cards
    Benefits/           "Why Train With Rob" section
    Testimonials/       Client results / testimonials
    ContactForm/         Inquiry form with validation
    Footer/              Footer with links and contact info
    shared/              Reusable pieces (e.g. PlaceholderImage)
  data/
    content.js          <-- Central place to edit ALL site text and content
  styles/
    tokens.css          Design tokens (colors, type, spacing)
    global.css          Base styles, resets, buttons
  App.jsx
  main.jsx
index.html              Page title, meta description, Open Graph tags
public/
  favicon.png           Site favicon (from the logo)
```

### Updating content

Almost everything on the page — Rob's bio, services, testimonials, contact
details, social links, nav labels — lives in **`src/data/content.js`**.
Edit that one file to update copy without touching any component code.

Anything still marked with a comment like `// Replace with client-provided
information` is a placeholder and should be swapped out once the real
information is available (e.g. real testimonials, confirmed email/phone,
confirmed social links, confirmation on whether online coaching is offered).

### Updating images

Photos live in `src/assets/images/`. To swap a photo, replace the file (or
add a new one) and update the `import` in the relevant component
(`Hero.jsx`, `About.jsx`, `Navbar.jsx`, `Footer.jsx`).

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
