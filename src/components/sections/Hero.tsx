"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CTAButton from "../ui/CTAButton";
import MarqueeStrip from "../ui/MarqueeStrip";
import SpinningCookie from "../ui/SpinningCookie";
import Image from "next/image";
import { usePreloader } from "../PreloaderProvider";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const cookieWrapRef = useRef<HTMLDivElement>(null);
  const [logoMarkup, setLogoMarkup] = useState<string | null>(null);
  const { isPreloaderComplete } = usePreloader();

  // ── Fetch SVG logo ───────────────────────────────────────────────
  useEffect(() => {
    let alive = true;
    fetch("/logo.svg")
      .then((r) => r.text())
      .then((t) => { if (alive) setLogoMarkup(t); })
      .catch(() => null);
    return () => { alive = false; };
  }, []);

  // ── Hide everything immediately so nothing flashes before animation ──
  // Runs as soon as the component mounts, before paint
  useEffect(() => {
    gsap.set(
      [taglineRef.current, ctaRef.current, cupRef.current, cookieWrapRef.current],
      { opacity: 0, y: 20 }
    );
    // Logo wrapper hidden until SVG loads
    if (logoWrapRef.current) {
      gsap.set(logoWrapRef.current, { opacity: 0 });
    }
  }, []);

  // Also hide logo wrapper whenever logoMarkup first renders into DOM
  useEffect(() => {
    if (!logoMarkup) return;
    gsap.set(logoWrapRef.current, { opacity: 0 });
  }, [logoMarkup]);

  // ── Master animation — only fires when BOTH conditions are true ──
  useEffect(() => {
    if (!isPreloaderComplete || !logoMarkup) return;

    const ctx = gsap.context(() => {
      const logoEl = logoWrapRef.current?.querySelector("svg");
      const paths = logoEl?.querySelectorAll<SVGPathElement>("path");
      if (!logoEl || !paths?.length) return;

      // ── 1. Prepare SVG paths for draw animation ──────────────────
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.dataset.fill = path.getAttribute("fill") || "#1A1A1A";
        path.style.stroke = "#e8470a";
        path.style.strokeWidth = "1.2";
        path.style.fill = "none";
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

      // Make logo wrapper visible now that paths are prepared
      gsap.set(logoWrapRef.current, { opacity: 1 });

      // ── 2. Master timeline — everything sequenced ────────────────
      const tl = gsap.timeline();

      // Tagline fades in first
      tl.to(taglineRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });

      // Logo paths draw themselves
      tl.to(
        paths,
        {
          strokeDashoffset: 0,
          duration: 1.3,
          ease: "power2.inOut",
          stagger: { each: 0.006, from: "random" },
        },
        "+=0.05"
      );

      // Fill the paths while still drawing
      tl.to(
        paths,
        {
          fill: (_i: number, target: Element) =>
            (target as SVGPathElement).dataset.fill || "#1A1A1A",
          stroke: "transparent",
          duration: 0.5,
          stagger: { each: 0.003, from: "random" },
        },
        "-=0.75"
      );

      // Cup image slides up
      tl.to(
        cupRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Cookie spins in
      tl.to(
        cookieWrapRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // CTA button
      tl.to(
        ctaRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

      // Gentle logo float after entrance
      tl.add(() => {
        gsap.to(logoEl, {
          y: -8,
          duration: 3.0,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isPreloaderComplete, logoMarkup]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh w-full bg-cream"
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-blend-color-burn opacity-70 bg-[url('https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b0b1e2ae528702c898a058_pattern.png')]"
        style={{
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex min-h-svh flex-col items-center px-5 md:px-8 lg:px-16 py-32 md:py-24 lg:py-32 text-center">
        <p
          ref={taglineRef}
          className="font-outfit text-[clamp(0.7rem,2.6vw,0.85rem)] uppercase tracking-[2.5px] text-chalk/60 z-10"
          style={{ opacity: 0 }} // SSR-safe initial hide
        >
          Coffee House &amp; Bakeshop · Rutherglen
        </p>

        <div
          ref={logoWrapRef}
          className="z-10 w-[clamp(260px,75vw,520px)] [&>svg]:w-full [&>svg]:h-auto"
          aria-label="Tee's Treats logo"
          style={{ opacity: 0 }} // SSR-safe initial hide
          dangerouslySetInnerHTML={logoMarkup ? { __html: logoMarkup } : undefined}
        />

        <MarqueeStrip
          content="SKINY PEOPLE ARE EASIER TO KIDNAP STAY SAFE EAT CAKE | "
          baseSpeed={1}
          rotateDeg={7}
          bgColor="#E8470A"
          textColor="#FFF5EC"
        />

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <CTAButton href="/contact-us" label="Contact Us" />
        </div>
      </div>

      {/* Spinning cookie */}
      <div
        ref={cookieWrapRef}
        className="absolute left-10 -translate-x-1/2 bottom-0 md:left-0 md:-translate-x-0 md:-bottom-24 z-20"
        style={{ opacity: 0 }}
      >
        <SpinningCookie />
      </div>

      {/* Cup image */}
      <div
        ref={cupRef}
        className="block absolute -bottom-10 -right-20 sm:-right-10 z-10 w-[30vw] min-w-[250px] max-w-[420px] aspect-square -rotate-12"
        style={{ opacity: 0 }}
      >
        <Image
          src="/cup.png"
          alt="A specialty coffee drink from Tee's Treats"
          fill
          sizes="(max-width: 1024px) 30vw, 420px"
          className="object-contain"
        />
      </div>
    </section>
  );
}
