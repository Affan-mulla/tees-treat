"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePreloader } from "@/components/PreloaderProvider";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import MenuWrapper from "./components/MenuWrapper";
import { CAKES, MATCHA, MENU_ITEMS } from "./menu-data";

const title = "Bakes, Cakes &  Matcha";

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
          delay: isPreloaderComplete ? 0.2 : 20,
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
            delay: isPreloaderComplete ? 0.7 : 2.7,
          },
        );
      }
    }, titleRef);

    return () => ctx.revert();
  }, [isPreloaderComplete]);

  useEffect(() => {
    if (!galleryRef.current) return;

    const ctx = gsap.context(() => {
      const tiles =
        galleryRef.current?.querySelectorAll<HTMLElement>("[data-bento-tile]");
      const cta =
        galleryRef.current?.querySelector<HTMLElement>("[data-bento-cta]");

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
      <div className="relative overflow-hidden bg-chalk">
        <div className="mx-auto flex min-h-[56vh] max-w-6xl flex-col items-center justify-center px-5 pb-30 pt-20 text-center md:min-h-[78vh] md:px-6 md:pb-36 md:pt-24">
          <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-cream/65 md:text-sm">
            Menu
          </p>

          <h1
            ref={titleRef}
            className="flex max-w-5xl flex-wrap items-center justify-center text-center text-[clamp(2.6rem,13vw,7.75rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-cream"
          >
            {title.split("").map((char, index) => (
              <span key={index} className="char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <div className="mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-cream/60 md:text-sm">
            <span>Weekend-only drops</span>
            <span className="hidden h-1 w-1 rounded-full bg-cream/30 md:block" />
            <span>Custom cake orders</span>
            <span className="hidden h-1 w-1 rounded-full bg-cream/30 md:block" />
            <span>Iced matcha favourites</span>
          </div>
        </div>

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

      <section className="relative z-10 bg-cream pb-24 pt-8 md:pt-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-10 md:px-6 md:pb-14">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] md:items-end md:gap-8">
            <div className="space-y-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-orange-primary/80">
                Order By Craving
              </p>
              <h2 className="max-w-3xl text-[clamp(2rem,6vw,4rem)] font-black leading-[0.95] tracking-tight text-chalk">
                Built to feel calmer on mobile, with the weekend favourites front
                and center.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-5 text-chalk/70 md:justify-self-end md:text-base">
              Start with the limited specials, then move through cakes and
              matcha without the sections crashing into each other.
            </p>
          </div>
        </div>

        <div className="space-y-5  md:space-y-8 md:px-6">
          <MenuWrapper
            MENU_ITEMS={MENU_ITEMS}
            title="Weekend Specials"
            eyebrow="Friday to Sunday"
            description="Small-batch drinks and bakes that rotate through the weekend and are worth getting to early."
            note="Limited batches"
            dark
            className=" md:rounded-[2em] bg-[radial-gradient(circle_at_top_right,_rgba(232,71,10,0.18),_transparent_35%),linear-gradient(135deg,#140d0a_0%,#241410_55%,#3a1d14_100%)]  shadow-[0_24px_60px_rgba(36,20,16,0.18)] ring-1 ring-white/10 md:px-8 md:py-8"
            cardClassName="bg-cream text-chalk shadow-[0px_0px_0px_1px_rgba(255,255,255,0.08),0px_16px_30px_rgba(0,0,0,0.18)]"
          />

          <MenuWrapper
            MENU_ITEMS={CAKES}
            title="Celebration Cakes"
            eyebrow="Made to order"
            description="Signature sizes for birthdays, gifting, and centerpieces, laid out with more breathing room for quick browsing."
            note="Custom-friendly"
            className="md:rounded-[2rem] bg-white/70 shadow-[0_10px_30px_rgba(26,26,26,0.05)] ring-1 ring-chalk/6 backdrop-blur-sm md:px-8 md:py-8"
            cardClassName="text-cream"
          />

          <MenuWrapper
            MENU_ITEMS={MATCHA}
            title="Matcha & Latte"
            eyebrow="House pours"
            description="Iced matcha, sweeter latte picks, and easy favourites for a faster drink decision on your phone."
            note="Sip favourites"
            className="md:rounded-[2rem] bg-white/70 shadow-[0_10px_30px_rgba(26,26,26,0.05)] ring-1 ring-chalk/6 backdrop-blur-sm md:px-8 md:py-8"
            cardClassName="text-cream"
          />
        </div>
      </section>

      <section className="bg-cream px-5 pb-24 pt-4 md:px-6 md:pt-8">
        <div ref={galleryRef} className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-chalk/50">
                Gallery
              </p>
              <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.5rem)] font-black leading-[1.05] text-chalk">
                Custom cakes, crafted to steal the spotlight.
              </h2>
            </div>
          </div>

          <div className="grid h-[660px] grid-cols-3 grid-rows-3 gap-2 md:h-[820px] md:grid-cols-3 md:grid-rows-3 md:gap-4">
            <div
              data-bento-tile
              className="col-start-1 row-start-1 col-span-2 row-span-2 overflow-hidden rounded-3xl bg-chalk/10 md:col-start-1 md:row-start-1 md:col-span-1 md:row-span-2"
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
              className="col-start-3 row-start-1 overflow-hidden rounded-3xl bg-chalk/10 md:col-start-2 md:row-start-1 md:col-span-2 md:row-span-1"
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
                <p className="text-xs uppercase tracking-[0.35em] text-cream/60">
                  Custom Orders
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  Design your dream cake
                </p>
                <CTAButton
                  href="/find-us"
                  className="px-6 py-3 text-sm md:text-base"
                  label="Contact Us"
                />
              </div>
            </div>

            <div
              data-bento-tile
              className="col-start-3 row-start-2 row-span-2 overflow-hidden rounded-3xl bg-chalk/10 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-1"
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
              className="hidden overflow-hidden rounded-3xl bg-chalk/10 md:block md:col-start-3 md:row-start-3 md:col-span-1 md:row-span-1"
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
              className="hidden overflow-hidden rounded-3xl bg-chalk/10 md:block md:col-start-1 md:row-start-3 md:col-span-2 md:row-span-1"
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
