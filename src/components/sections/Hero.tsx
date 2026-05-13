"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { getLogoMarkup } from "@/lib/logoAnimation";
import { usePreloader } from "../PreloaderProvider";
import CTAButton from "../ui/CTAButton";
import MarqueeStrip from "../ui/MarqueeStrip";
import SpinningCookie from "../ui/SpinningCookie";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const cookieWrapRef = useRef<HTMLDivElement>(null);
  const [logoMarkup, setLogoMarkup] = useState<string | null>(null);
  const { isPreloaderComplete } = usePreloader();

  useEffect(() => {
    let alive = true;

    getLogoMarkup()
      .then((markup) => {
        if (alive) {
          setLogoMarkup(markup);
        }
      })
      .catch(() => null);

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    gsap.set(
      [taglineRef.current, ctaRef.current, cupRef.current, cookieWrapRef.current],
      { opacity: 0, y: 20 },
    );

    if (logoWrapRef.current) {
      gsap.set(logoWrapRef.current, { opacity: 0 });
    }
  }, []);

  useEffect(() => {
    if (!logoMarkup) return;
    gsap.set(logoWrapRef.current, { opacity: 0 });
  }, [logoMarkup]);

  useEffect(() => {
    if (!isPreloaderComplete || !logoMarkup) return;

    const ctx = gsap.context(() => {
      const logoEl = logoWrapRef.current?.querySelector("svg");
      if (!logoEl) return;

      gsap.set(logoWrapRef.current, { opacity: 1 });

      const tl = gsap.timeline();

      tl.to(taglineRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.to(
        cupRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.3",
      );

      tl.to(
        cookieWrapRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      );

      tl.to(
        ctaRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      );

      tl.add(() => {
        gsap.to(logoEl, {
          y: -8,
          duration: 3,
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
      <div
        className="absolute inset-0 pointer-events-none bg-blend-color-burn opacity-70 bg-[url('https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b0b1e2ae528702c898a058_pattern.png')]"
        style={{
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-svh flex-col items-center px-5 py-32 text-center md:px-8 md:py-24 lg:px-16 lg:py-32">
        <p
          ref={taglineRef}
          className="z-10 font-outfit text-[clamp(0.7rem,2.6vw,0.85rem)] uppercase tracking-[2.5px] text-chalk/60"
          style={{ opacity: 0 }}
        >
          Coffee House &amp; Bakeshop · Rutherglen
        </p>

        <div
          ref={logoWrapRef}
          className="z-10 aspect-[465/400] w-[clamp(260px,75vw,520px)] [&>svg]:h-auto [&>svg]:w-full"
          data-hero-logo-target
          aria-label="Tee's Treats logo"
          style={{ opacity: 0 }}
          dangerouslySetInnerHTML={logoMarkup ? { __html: logoMarkup } : undefined}
          role="img"
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

      <div
        ref={cookieWrapRef}
        className="absolute bottom-0 left-10 z-20 -translate-x-1/2 md:-bottom-24 md:left-0 md:-translate-x-0"
        style={{ opacity: 0 }}
      >
        <SpinningCookie />
      </div>

      <div
        ref={cupRef}
        className="absolute -right-20 -bottom-10 z-10 block aspect-square w-[30vw] min-w-[250px] max-w-[420px] -rotate-12 sm:-right-10"
        style={{ opacity: 0 }}
      >
        <Image
          src="/cup.png"
          alt="A specialty coffee drink from Tee's Treats"
          fill
          sizes="(max-width: 1024px) 30vw, 420px"
          className="object-contain"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
