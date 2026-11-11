# danielnguyen.me

Personal portfolio for Daniel James — Full-stack/AI Engineer & Content Creator.

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
src/
  app/                 # App Router pages, layout, global styles
  components/
    ui/                # Reusable UI primitives
    layout/            # Shell, sidebar, nav, viewport, background
    sections/          # Page sections (Home, About, Contact, …)
  lib/                 # Utilities, site config, section navigation helpers
  i18n/                # next-intl request config
  messages/            # Translation dictionaries (en, vi)
public/                # Static assets
```

## Design tokens

Defined in `src/app/globals.css`:

| Token | Value |
| --- | --- |
| Primary | `#E96A45` |
| Primary Dark | `#D45735` |
| Background | `#F6E4D8` |
| Surface | `#403C3A` |
| Card | `#FFFFFF` |
| Foreground | `#1A1A1A` |
