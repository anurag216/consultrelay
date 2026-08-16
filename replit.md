# ConsultRelay

A polished, production-quality one-page marketing website for ConsultRelay — a B2B managed service that helps U.S. dental marketing agencies manage and measure the journey from paid implant lead to attended consultation (the "30-Day Implant Lead-to-Show Pilot").

## Run & Operate

- `pnpm --filter @workspace/consultrelay run dev` — run the marketing site (managed via workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React + Vite + Tailwind CSS (static marketing site, no backend)
- Manrope font (Google Fonts)
- Framer Motion for animations
- wouter for routing (/privacy page)
- Lucide icons

## Where things live

- `artifacts/consultrelay/src/pages/home.tsx` — main one-page marketing site
- `artifacts/consultrelay/src/pages/privacy.tsx` — /privacy page
- `artifacts/consultrelay/src/components/layout/navbar.tsx` — sticky navbar + LogoIcon + Logo SVG components
- `artifacts/consultrelay/src/components/layout/footer.tsx` — footer
- `artifacts/consultrelay/src/index.css` — theme, Manrope import, brand color tokens (navy, ivory, teal, mint, charcoal)
- `artifacts/consultrelay/index.html` — SEO metadata, OG tags, favicon

## Brand

- Deep navy: #0D2235
- Warm ivory: #F8F7F2
- Teal: #2A8C82 (action/accent — use sparingly)
- Pale mint: #E8F4F1
- Charcoal: #26343D
- Font: Manrope

## Product

ConsultRelay manages and measures the post-lead workflow for dental implant marketing agencies:
**Paid Lead → Engaged → Qualified → Booked → Attended**

Pilot price: $1,500 fixed + direct communication costs. Contact: ag@consultrelay.space

## User preferences

- No fake testimonials, client logos, stats, or customer evidence
- No AI sparkles, robot imagery, tooth icons, or dental clichés
- No lorem ipsum anywhere
- No contact form — mailto links only
- Do NOT claim HIPAA compliance

## Gotchas

- LogoIcon is exported from navbar.tsx and must be imported by any page that uses it
- Teal is the only action/accent color — use sparingly
- Smooth scroll is enabled via `html { scroll-behavior: smooth }` in index.css
- All CTA mailto links use: `mailto:ag@consultrelay.space?subject=ConsultRelay%20Lead-to-Show%20Pilot`
