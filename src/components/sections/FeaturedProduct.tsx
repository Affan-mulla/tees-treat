"use client";

/**
 * FeaturedProduct.tsx — Performance changes:
 *
 * CRITICAL: Instagram CDN URLs expire (typically within days/weeks).
 * The images WILL break in production. Download them locally:
 *
 *   public/
 *     images/
 *       featured-cakes.jpg
 *       featured-coffee.jpg
 *       featured-bakes.jpg
 *
 * Then update the `image` values in CARDS below to "/images/featured-cakes.jpg" etc.
 * next/image will then optimize them to AVIF/WebP at the right breakpoints.
 *
 * Removed: unoptimized={true} — this was bypassing all next/image optimization.
 * With local images next/image will serve AVIF (~60% smaller than JPEG).
 */

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const CARDS = [
  {
    id: "cakes",
    // TODO: Download and replace with "/images/featured-cakes.jpg"
    image:
      "/cake1.jpg",
    bg: "#1a1a1a",
    textColor: "#FFF5EC",
    label: "Custom Cakes",
    headline: "Your moment,\nmade edible.",
    body: "Every celebration deserves something that makes people stop and stare before they even take a slice.",
  },
  {
    id: "coffee",
    // TODO: Download and replace with "/images/featured-coffee.jpg"
    image:
      "/coofee.jpg",
    bg: "#e8470a",
    textColor: "#FFF5EC",
    label: "Coffee",
    headline: "Poured with\nintention.",
    body: "Every cup starts with care. Whether it's your first of the day or your reward for making it to Friday.",
  },
  {
    id: "bakes",
    // TODO: Download and replace with "/images/featured-bakes.jpg"
    image:
      "/cookie1.jpg",
    bg: "#F2C4CE",
    textColor: "#1A1A1A",
    label: "Bakes",
    headline: "Gone by Sunday.\nEvery time.",
    body: "Biscoff. Kinder. Rocky road. The kind of thing you tell yourself you'll share. You won't.",
  },
];

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
  const labelRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgInnerRef.current,
        { scale: 1.12, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgInnerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

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

      gsap.fromTo(
        [numRef.current, labelRef.current, bodyRef.current],
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const words = headRef.current?.querySelectorAll<HTMLSpanElement>(".word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.75,
            ease: "back.out(1.4)",
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

  // First card image is above the fold — prioritize it
  const isAboveFold = index === 0;

  return (
    <div
      ref={cardRef}
      className="sticky top-0 w-full min-h-screen flex items-center overflow-hidden pb-20"
      style={{ backgroundColor: card.bg }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-20">
        {/* Image */}
        <div className="relative w-full aspect-square overflow-hidden">
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

          <div
            className="absolute inset-0"
            style={{ clipPath: `url(#clip-card-${card.id})` }}
          >
            <div
              ref={imgInnerRef}
              className="absolute inset-0"
              style={{
                clipPath: `url(#clip-card-${card.id})`,
                willChange: "transform, opacity",
              }}
            >
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
                // Only the first card is above fold — load it eagerly
                priority={isAboveFold}
                // REMOVED: unoptimized={true}
                // next/image will now serve AVIF/WebP at correct sizes
                // Once you move images to /public, this will save ~60% bandwidth
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span
              ref={numRef}
              className="font-outfit text-[11px] font-semibold tracking-[3px] uppercase opacity-40"
              style={{ color: card.textColor }}
            >
              0{index + 1}
            </span>
            <span className="h-px w-8 opacity-30" style={{ backgroundColor: card.textColor }} />
            <span
              ref={labelRef}
              className="font-outfit text-[11px] font-semibold tracking-[3px] uppercase opacity-60"
              style={{ color: card.textColor }}
            >
              {card.label}
            </span>
          </div>

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

          <span className="block w-12 h-px opacity-30" style={{ backgroundColor: card.textColor }} />

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
          cardRef={(el) => { cardRefs.current[i] = el; }}
        />
      ))}
    </div>
  );
}