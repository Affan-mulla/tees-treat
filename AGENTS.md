<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project quick start

- Commands live in [package.json](package.json): `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.
- App Router lives in [src/app](src/app); route entrypoints are [src/app/page.tsx](src/app/page.tsx) and [src/app/*/page.tsx](src/app), layout defaults in [src/app/layout.tsx](src/app/layout.tsx), globals in [src/app/globals.css](src/app/globals.css).
- Shared UI lives in [src/components](src/components) with section blocks in [src/components/sections](src/components/sections) and layout in [src/components/layout](src/components/layout).
- Motion uses GSAP and Lenis; see [src/lib/gsap.ts](src/lib/gsap.ts) and [src/components/SmoothScroll.tsx](src/components/SmoothScroll.tsx). Keep animation code in client components.
- Image optimization rules and allowed remote hosts are configured in [next.config.ts](next.config.ts); prefer local assets in public/ when possible.
- For general setup and run instructions, see [README.md](README.md).
