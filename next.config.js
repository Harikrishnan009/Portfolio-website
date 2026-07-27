# Harikrishnan K P — Portfolio

A data-engineer portfolio built with Next.js (App Router) + TypeScript + Tailwind CSS.

The signature piece is the hero: an interactive architecture diagram of the actual
stack (sources → S3 → Airflow → PySpark/Hive → reports), with animated data particles
flowing along the pipeline and hoverable nodes. Experience is laid out like a DAG run
log, skills as grouped clusters, and everything ships in a light and dark theme
(toggle top-right, persisted in localStorage, defaults to the browser's preference).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Next.js** (auto-detected). No environment variables needed.
4. Click Deploy.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

## Editing content

- **Hero / stack diagram:** `components/Hero.tsx` — edit the `nodes` array.
- **Experience:** `components/Experience.tsx` — edit the `jobs` array (steps + metrics).
- **Skills:** `components/Skills.tsx` — edit `clusters` and `languages`.
- **Projects:** `components/Projects.tsx`.
- **Certifications & awards:** `components/Certifications.tsx`.
- **Contact details:** `components/Contact.tsx` — edit the `CONTACT` object. Consider
  adding your real LinkedIn profile URL as a link once you have the slug.
- **Colors / theme tokens:** `app/globals.css` — CSS variables under `:root` (light)
  and `[data-theme="dark"]`.
- **Fonts:** `app/layout.tsx` — currently Fraunces (display/headlines) + Inter (body) + JetBrains
  Mono (numerals, small technical labels).

## Notes

- Built and structured for the Vercel zero-config Next.js deploy path.
- Respects `prefers-reduced-motion` and keeps visible keyboard focus states throughout.
