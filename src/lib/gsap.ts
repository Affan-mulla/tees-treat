/**
 * src/lib/gsap.ts
 *
 * Single source of truth for GSAP setup.
 * Import { gsap, ScrollTrigger, Observer } from here — NEVER import
 * directly from "gsap" or "gsap/ScrollTrigger" in components, because:
 *
 *  1. It guarantees plugins are registered exactly once.
 *  2. Next.js can tree-shake unused plugins per-page when they're
 *     only imported here rather than scattered across 12 client components.
 *  3. Keeps the gsap singleton consistent across all chunks.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

// Guard: registerPlugin is idempotent but calling it 10+ times in dev
// causes noisy warnings. One check keeps the console clean.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

export { gsap, ScrollTrigger, Observer };