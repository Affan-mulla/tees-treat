"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CTAButton from "../ui/CTAButton";
import MarqueeStrip from "../ui/MarqueeStrip";
import SpinningCookie from "../ui/SpinningCookie";
import Image from "next/image";

interface HeroProps {
  animateIn?: boolean;
}

export default function Hero({ animateIn = false }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);
  const [logoMarkup, setLogoMarkup] = useState<string | null>(null);



  useEffect(() => {
    let isMounted = true;

    fetch("/logo.svg")
      .then((res) => res.text())
      .then((text) => {
        if (isMounted) setLogoMarkup(text);
      })
      .catch(() => null);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!animateIn || !logoMarkup) return;

    const ctx = gsap.context(() => {
      const logoEl = logoWrapRef.current?.querySelector("svg");
      const paths = logoEl?.querySelectorAll("path");

      if (!logoEl || !paths || !paths.length) return;

      paths.forEach((path) => {
        const length = path.getTotalLength();
        const fill = path.getAttribute("fill") || "#1A1A1A";
        path.dataset.fill = fill;

        path.style.stroke = "#1A1A1A";
        path.style.strokeWidth = "1.2";
        path.style.fill = "none";
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

      const tl = gsap.timeline();

      tl.from(taglineRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.7,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      });

      tl.to(
        paths,
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          stagger: { each: 0.006, from: "random" },
        },
        ">-0.2",
      );

      tl.to(
        paths,
        {
          fill: (index, target) => {
            const path = target as SVGPathElement;
            return path.dataset.fill || "#1A1A1A";
          },
          stroke: "transparent",
          duration: 0.8,
          stagger: { each: 0.003, from: "random" },
        },
        "-=0.8",
      );

      tl.from(
        cakeRef.current,
        {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        },
        "-=0.3",
      );

      tl.from(
        badgeRef.current,
        {
          y: 12,
          opacity: 0,
          duration: 0.6,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        },
        "-=0.2",
      );

      tl.from(
        ctaRef.current,
        {
          y: 12,
          opacity: 0,
          duration: 0.6,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        },
        "-=0.05",
      );

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
  }, [animateIn, logoMarkup]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh w-full bg-cream "
    >
      <div
       className="absolute inset-0 pointer-events-none bg-blend-color-burn opacity-70  bg-[url('https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b0b1e2ae528702c898a058_pattern.png')] "
       style={{
        maskImage : "linear-gradient(to bottom, black 70%, transparent 100%)",
        WebkitMaskImage : "linear-gradient(to bottom, black 70%, transparent 100%)"
      }} />
      <div className="relative z-10 flex min-h-svh flex-col items-center  px-5 md:px-8 lg:px-16 py-32 md:py-24 lg:py-32 text-center">
        <p
          ref={taglineRef}
          className="font-outfit text-[clamp(0.7rem,2.6vw,0.85rem)] uppercase tracking-[2.5px] text-chalk/60 z-10"
        >
          Coffee House &amp; Bakeshop · Rutherglen
        </p>
        <div
          ref={logoWrapRef}
          className="z-10 w-[clamp(260px,75vw,520px)] [&>svg]:w-full [&>svg]:h-auto"
          aria-label="Tee's Treats logo"
          dangerouslySetInnerHTML={
            logoMarkup ? { __html: logoMarkup } : undefined
          }
        />
        <MarqueeStrip
          content="SKINY PEOPLE ARE EASIER TO KIDNAP STAY SAFE EAT CAKE | "
          baseSpeed={1}
          rotateDeg={7}
          bgColor="#E8470A"
          textColor="#FFF5EC"
        />
        <div ref={ctaRef}>
          <CTAButton href="/contact-us" label="Contact Us" />
        </div>
      </div>

      <SpinningCookie className="left-10 -translate-x-1/2  md:left-0 md:-translate-x-0 md:-bottom-24" />

      <div className="block absolute -bottom-10 -right-20 sm:-right-10 z-10 w-[30vw] min-w-[250px] sm:min-h-auto max-w-[420px] aspect-square -rotate-12">
        <Image
          src="/cup.png"
          alt="A delicious cake with pink frosting and sprinkles, representing Tee's Treats' custom cakes."
          fill
          sizes="(max-width: 1024px) 30vw, 420px"
          className="object-contain"
        />
      </div>
    </section>
  );
}
