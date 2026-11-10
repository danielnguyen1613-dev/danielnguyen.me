# danielnguyen.me

Personal portfolio for Nguyen Hoang Viet — Frontend Developer & Content Creator.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- GSAP + ScrollTrigger
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
components/     # Shared UI (shadcn in ui/, layout shells in layout/)
features/       # Domain sections (home, about, projects, blog, …)
content/        # MDX / JSON content (blog, projects)
hooks/          # React hooks (useGsap, …)
i18n/           # next-intl request config
lib/            # Utilities, GSAP helpers, site config
messages/       # Translation dictionaries (en, vi)
public/         # Static assets
```

## Design tokens

Defined in `app/globals.css` from the portfolio system design:

| Token | Value |
| --- | --- |
| Primary | `#1CB981` |
| Primary Dark | `#059669` |
| Background | `#0B1F1A` |
| Surface | `#132E27` |
| Text | `#F8FAFC` |
| Muted | `#94A3B8` |

## Animation rules

- GSAP only (no Framer Motion)
- Prefer `transform` / `opacity`
- Use `gsap.context()` + `useGsap` for cleanup
- Respect `prefers-reduced-motion`
