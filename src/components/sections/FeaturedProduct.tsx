"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: "cakes",
    image:
      "https://instagram.famd5-4.fna.fbcdn.net/v/t51.82787-15/687258961_18104764535479699_8427104193732934123_n.jpg?stp=dst-jpegr_e35_p1080x1080_tt6&_nc_cat=111&ig_cache_key=Mzg4ODE2MjYxOTY1NTc3MTk1NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjI3NTF4MzA3Mi5oZHIuQzMifQ%3D%3D&_nc_ohc=GXxk-pyp7mwQ7kNvwHsM0zT&_nc_oc=AdpNMq_fmp1AyfjmrnyKJgyifPryVMdsPEoiCH8qXSfR3ebxNCW-A_JoBTUoifc6CPFcWhVJkcsaYe3I32X8rpMq&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.famd5-4.fna&_nc_gid=U86eaVzyIMW0AcuyGsQL1w&_nc_ss=7a22e&oh=00_Af762X95VGeI_Ju_If5XZBAMiuO0Qg6kYxGWkJRG2DN7JQ&oe=69FCC31E",
    bg: "#1a1a1a",
    textColor: "#FFF5EC",
    label: "Custom Cakes",
    headline: "Your moment,\nmade edible.",
    body: "Every celebration deserves something that makes people stop and stare before they even take a slice.",
  },
  {
    id: "coffee",
    image:
      "https://instagram.famd5-1.fna.fbcdn.net/v/t51.82787-15/661598632_18101545418479699_7578322305900533722_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=107&ig_cache_key=Mzg2OTIyMzEzMzgxOTQ4MTIwNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5oZHIuQzMifQ%3D%3D&_nc_ohc=kzRB-DBWTmYQ7kNvwGWSn6Q&_nc_oc=Ado4wBYEuD4t3YMbFQrPhM-cvrubi0SdJDD3tAo2LuoQg-Oua9yfpzIhe4bsX_4RNghBzvMqlb79siSQ9jLzDtpw&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.famd5-1.fna&_nc_gid=O4GhkwFJ15Ln3IxcQB44Dg&_nc_ss=7a22e&oh=00_Af7g3wK9ZPu3iG5ApCdxU0pCUbnLDzYACTSnNHHjU3Y9ww&oe=69FCB04C",
    bg: "#e8470a",
    textColor: "#FFF5EC",
    label: "Coffee",
    headline: "Poured with\nintention.",
    body: "Every cup starts with care. Whether it's your first of the day or your reward for making it to Friday.",
  },
  {
    id: "bakes",
    image:
      "https://instagram.famd5-2.fna.fbcdn.net/v/t51.82787-15/573918732_18085636247479699_5232559246141256817_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzc1OTkxMDgyODQ2ODg3NzM0OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=VyAAMurd-l4Q7kNvwGemDCC&_nc_oc=Adr6POCHwqxyYhXYeU72oCi10S_pdjE7XODoNRNDfLkpf6mHzG5LkEfv0OcSzGc-dsT0ZrptgLblK6UaMk9m9M6t&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.famd5-2.fna&_nc_gid=cpgQfJp4mzIKgh1YDzMLxQ&_nc_ss=7a22e&oh=00_Af6S4tqwUhfMZLBdf_FecyaSybpL1AGrH6wXw1PPXVLtnw&oe=69FCD529",
    bg: "#F2C4CE",
    textColor: "#1A1A1A",
    label: "Bakes",
    headline: "Gone by Sunday.\nEvery time.",
    body: "Biscoff. Kinder. Rocky road. The kind of thing you tell yourself you'll share. You won't.",
  },
];

// ─── CLIP PATH ─────────────────────────────────────────────────────────────
// Rectangle with notched top-right corner
// clipPathUnits="objectBoundingBox" means coords are 0–1 relative to element
const CLIP_PATH =
  "M0 0.0417599C0 0.0186966 0.0250721 0 0.056 0H0.6105C0.641428 0 0.6665 0.0186965 0.6665 0.0417599V0.148024C0.6665 0.171087 0.691572 0.189784 0.7225 0.189784H0.944C0.974928 0.189784 1 0.20848 1 0.231544V0.95824C1 0.981303 0.974928 1 0.944 1H0.056C0.0250721 1 0 0.981303 0 0.95824V0.0417599Z";

function Card({
  card,
  index,
  cardRef,
}: {
  card: (typeof CARDS)[0];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const imgInnerRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Image entrance — scale up from inside clip ─────────────────
      gsap.fromTo(
        imgInnerRef.current,
        { scale: 1.12, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          scrollTrigger: {
            trigger: imgInnerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // ── Image parallax on scroll ───────────────────────────────────
      // Moves the inner image up slightly as you scroll past
      // The clip stays fixed — only the image content shifts
      gsap.to(imgInnerRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: imgInnerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ── Figure clip-path reveal — wipes in from bottom ────────────
      // Starts clipped to 0 height, reveals to full
      gsap.fromTo(
        figureRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          scrollTrigger: {
            trigger: imgInnerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // ── Text stagger ───────────────────────────────────────────────
      gsap.fromTo(
        [numRef.current, labelRef.current, bodyRef.current],
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          stagger: 0.07,
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // ── Headline word-by-word reveal ───────────────────────────────
      const words = headRef.current?.querySelectorAll<HTMLSpanElement>(".word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.75,
            ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            stagger: 0.045,
            scrollTrigger: {
              trigger: headRef.current,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="sticky top-0 w-full min-h-screen flex items-center overflow-hidden pb-20"
      style={{ backgroundColor: card.bg }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-20">
        {/* ── LEFT — Clipped image ──────────────────────────────────── */}
        {/*
          Three layer setup:
          1. figureRef    — aspect ratio container, holds the SVG clipPath
                           We also apply a secondary inset() reveal animation here
          2. imgInnerRef  — slightly oversized (110%) so parallax yPercent
                           shift doesn't expose edges outside the clip
          3. next/image   — fill, object-cover

          The SVG clipPath shape (notched top-right) is defined with
          clipPathUnits="objectBoundingBox" so it scales to any size.
        */}
        <div className="relative w-full aspect-square overflow-hidden">
          {/* Clip path definition — hidden, scoped to this card by unique ID */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <clipPath
                id={`clip-card-${card.id}`}
                clipPathUnits="objectBoundingBox"
              >
                <path d={CLIP_PATH} />
              </clipPath>
            </defs>
          </svg>

          {/*
            figureRef — the clipped container.
            Width/height 100% fills the aspect-ratio parent.
            clipPath references the unique ID above.
            overflow-hidden ensures parallax shift doesn't bleed.
          */}
          <div
          
            className="absolute inset-0     "
            style={{
              clipPath: `url(#clip-card-${card.id})`,
              willChange: "clip-path",
            }}
          >
            {/*
              imgInnerRef — image wrapper, slightly larger than container
              so parallax movement (-10% to 0%) never exposes a gap.
              120% height, centered, moves on scroll.
            */}
            <div
              ref={imgInnerRef}
              className="absolute inset-0 "
              style={{
                clipPath: `url(#clip-card-${card.id})`,
                willChange: "transform, opacity, clip-path",
              }}
            >
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
                unoptimized
              />
            </div>
          </div>

        </div>

        {/* ── RIGHT — Text ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {/* Number + label */}
          <div className="flex items-center gap-4">
            <span
              ref={numRef}
              className="font-outfit text-[11px] font-semibold tracking-[3px] uppercase opacity-40"
              style={{ color: card.textColor }}
            >
              0{index + 1}
            </span>
            <span
              className="h-px w-8 opacity-30"
              style={{ backgroundColor: card.textColor }}
            />
            <span
              ref={labelRef}
              className="font-outfit text-[11px] font-semibold tracking-[3px] uppercase opacity-60"
              style={{ color: card.textColor }}
            >
              {card.label}
            </span>
          </div>

          {/* Headline */}
          <h2
            ref={headRef}
            className="font-caprasimo text-[clamp(2.8rem,5.5vw,5rem)] leading-[1.05]"
            style={{ color: card.textColor }}
          >
            {card.headline.split("\n").map((line, li) => (
              <span key={li} className="block overflow-hidden">
                {line.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    className="word inline-block mr-[0.2em]"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          {/* Divider */}
          <span
            className="block w-12 h-px opacity-30"
            style={{ backgroundColor: card.textColor }}
          />

          {/* Body */}
          <p
            ref={bodyRef}
            className="font-dmsans text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.75] max-w-sm opacity-80"
            style={{ color: card.textColor }}
          >
            {card.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card || i === CARDS.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {CARDS.map((card, i) => (
        <Card
          key={card.id}
          card={card}
          index={i}
          cardRef={(el) => {
            cardRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}
