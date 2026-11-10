# danielnguyen.me

Personal portfolio for Nguyen Hoang Viet — Frontend Developer & Content Creator.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- GSAP
- Lucide React
- next-intl (`en` / `vi`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/            # App Router pages & global styles
components/     # UI (ui/), portfolio shell, sections
hooks/          # React hooks (useGsap, …)
i18n/           # next-intl request config
lib/            # Shared utilities, GSAP helpers, site config
messages/       # Translation dictionaries (en, vi)
public/         # Static assets
```

## Design tokens

Defined in `app/globals.css`:

| Token | Value |
| --- | --- |
| Primary | `#E96A45` |
| Primary Dark | `#D45735` |
| Background | `#F6E4D8` |
| Surface | `#403C3A` |
| Card | `#FFFFFF` |
| Foreground | `#1A1A1A` |

## Animation rules

- GSAP only (no Framer Motion)
- Prefer `transform` / `opacity`
- Use `gsap.context()` + `useGsap` for cleanup
- Respect `prefers-reduced-motion`
