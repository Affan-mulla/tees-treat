"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePreloader } from "@/components/PreloaderProvider";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import MenuWrapper from "./components/MenuWrapper";
import { CAKES, MATCHA, MENU_ITEMS } from "./menu-data";

const title = "Our Products";


const Page = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const copyRef = useRef<HTMLParagraphElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const { isPreloaderComplete } = usePreloader();

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll(".char");

      gsap.fromTo(
        chars as NodeListOf<HTMLElement>,
        { scale: 0.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.04,
          delay: isPreloaderComplete ? 0 : 1.5,
        },
      );

      if (copyRef.current) {
        gsap.fromTo(
          copyRef.current,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.7,
          },
        );
      }
    }, titleRef);

    return () => ctx.revert();
  }, [isPreloaderComplete]);

  useEffect(() => {
    if (!galleryRef.current) return;

    const ctx = gsap.context(() => {
      const tiles = galleryRef.current?.querySelectorAll<HTMLElement>("[data-bento-tile]");
      const cta = galleryRef.current?.querySelector<HTMLElement>("[data-bento-cta]");

      if (tiles?.length) {
        gsap.fromTo(
          tiles,
          { y: 24, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%",
            },
          },
        );
      }

      if (cta) {
        gsap.fromTo(
          cta,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: cta,
              start: "top 85%",
            },
          },
        );
      }
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen overflow-hidden bg-cream">
      {/* Hero */}
      <div className="relative overflow-hidden bg-chalk">
        <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 pb-36 pt-24 text-center md:min-h-[80vh]">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-cream/70 md:text-sm">
            Menu
          </p>

          <h1
            ref={titleRef}
            className="flex flex-wrap items-center justify-center text-center text-[clamp(2.5rem,10vw,8rem)] font-black uppercase leading-none tracking-tight text-cream"
          >
            {title.split("").map((char, index) => (
              <span key={index} className="char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p
            ref={copyRef}
            className="mt-6 max-w-xl leading-relaxed text-cream/80 md:text-lg"
          >
            Explore our delicious menu, crafted with fresh ingredients and bold
            flavors.
          </p>
        </div>

        {/* Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block h-[120px] w-full md:h-[180px]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#fff5ec"
              d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,224C1120,224,1280,192,1360,176L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <section className="relative z-10 bg-cream pb-24 pt-12 space-y-10 ">
        <MenuWrapper MENU_ITEMS={MENU_ITEMS} title={"Weekly Specials"} />
        <MenuWrapper MENU_ITEMS={CAKES} title={"Cakes"} />
        <MenuWrapper MENU_ITEMS={MATCHA} title={"Matcha & Latte"} />
      </section>

      {/* Grid Layout */}
      <section className="bg-cream px-6 pb-24">
        <div ref={galleryRef} className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-chalk/50">Gallery</p>
              <h2 className="mt-2 text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.1] font-black text-chalk">
                Custom cakes, crafted to steal the spotlight.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-4 md:grid-cols-3 md:grid-rows-3 h-[660px] md:h-[820px]">
            <div
              data-bento-tile
              className="col-start-1 row-start-1 col-span-2 row-span-2 rounded-3xl overflow-hidden bg-chalk/10 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-2"
            >
              <Image
                src="/cake/9inch-t.jpg"
                alt="Tall heart cake"
                fill
                sizes="(max-width: 768px) 66vw, 33vw"
                className="object-cover"
              />
            </div>

            <div
              data-bento-tile
              className="col-start-3 row-start-1 rounded-3xl overflow-hidden bg-chalk/10 md:col-start-2 md:row-start-1 md:col-span-2 md:row-span-1"
            >
              <Image
                src="/cake/6inch-t-r.jpg"
                alt="Tall round cake"
                fill
                sizes="(max-width: 768px) 33vw, 66vw"
                className="object-cover"
              />
            </div>

            <div
              data-bento-cta
              className="col-start-1 row-start-3 col-span-2 flex items-center justify-center rounded-3xl bg-chalk text-cream md:col-start-2 md:row-start-2 md:col-span-1 md:row-span-1"
            >
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-cream/60">Custom Orders</p>
                <p className="mt-3 text-2xl font-semibold">Design your dream cake</p>
                <CTAButton href="/find-us" className="px-6 py-3 text-sm md:text-base" label="Contact Us" />
              </div>
            </div>

            <div
              data-bento-tile
              className="col-start-3 row-start-2 row-span-2 rounded-3xl overflow-hidden bg-chalk/10 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-1"
            >
              <Image
                src="/cake/6inch-h-t.jpg"
                alt="Round cake"
                fill
                sizes="(max-width: 768px) 33vw, 33vw"
                className="object-cover"
              />
            </div>

            <div
              data-bento-tile
              className="hidden rounded-3xl overflow-hidden bg-chalk/10 md:block md:col-start-3 md:row-start-3 md:col-span-1 md:row-span-1"
            >
              <Image
                src="/cake/9inch-h.jpg"
                alt="Heart cake"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>

            <div
              data-bento-tile
              className="hidden rounded-3xl overflow-hidden bg-chalk/10 md:block md:col-start-1 md:row-start-3 md:col-span-2 md:row-span-1"
            >
              <Image
                src="/cake/mini-h.jpg"
                alt="Tall celebration cake"
                fill
                sizes="(max-width: 768px) 50vw, 66vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Page;
