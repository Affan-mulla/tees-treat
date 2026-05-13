"use client";

import { useRef } from "react";
import MenuCarousel, { MenuCarouselHandle } from "@/components/MenuCarousel";
import useMobile from "@/hooks/useMobile";
import MenuCard from "./MenuCard";
import type { MenuItem } from "../menu-types";

interface MenuWrapperProps {
  MENU_ITEMS: MenuItem[];
  title: string;
  eyebrow?: string;
  description?: string;
  note?: string;
  className?: string;
  cardClassName?: string;
  dark?: boolean;
}

export default function MenuWrapper({
  MENU_ITEMS,
  title,
  eyebrow,
  description,
  note,
  className = "",
  cardClassName = "",
  dark = false,
}: MenuWrapperProps) {
  const carouselRef = useRef<MenuCarouselHandle | null>(null);
  const isMobile = useMobile();
  const titleTone = dark ? "text-cream" : "text-chalk";
  const eyebrowTone = dark ? "text-cream/65" : "text-orange-primary/80";
  const descriptionTone = dark ? "text-cream/75" : "text-chalk/70";
  const noteTone = dark
    ? "border-white/12 bg-white/8 text-cream"
    : "border-chalk/10 bg-white/80 text-chalk/70";
  const buttonTone = dark
    ? "border-white/12 bg-white/6 text-cream hover:border-white/35"
    : "border-chalk/12 bg-white/70 text-chalk hover:border-chalk/35";

  return (
    <section className={`relative mx-auto max-w-7xl overflow-hidden ${className}`}>
      <div className="mb-6 flex flex-col gap-5 border-b border-current/10 p-6 md:p-0 md:pb-6 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="max-w-2xl space-y-3">
          {eyebrow ? (
            <p
              className={`text-[0.7rem] font-semibold uppercase tracking-[0.32em] ${eyebrowTone}`}
            >
              {eyebrow}
            </p>
          ) : null}

          <div className="space-y-3">
            <h2
              className={`text-[clamp(2rem,6vw,3.3rem)] font-black leading-[0.95] tracking-tight ${titleTone}`}
            >
              {title}
            </h2>
            {description ? (
              <p
                className={`max-w-xl text-sm leading-6 md:text-base md:leading-7 ${descriptionTone}`}
              >
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:flex-col md:items-end md:justify-end">
          {note ? (
            <p
              className={`inline-flex w-fit rounded-full border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] ${noteTone}`}
            >
              {note}
            </p>
          ) : (
            <div />
          )}

          {!isMobile && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => carouselRef.current?.scrollPrev()}
                className={`h-10 w-10 rounded-full border transition-colors ${buttonTone}`}
                aria-label={`Scroll ${title} left`}
              >
                <span className="flex h-full w-full rotate-180 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--carbon"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10z"
                    ></path>
                  </svg>
                </span>
              </button>
              <button
                type="button"
                onClick={() => carouselRef.current?.scrollNext()}
                className={`h-10 w-10 rounded-full border transition-colors ${buttonTone}`}
                aria-label={`Scroll ${title} right`}
              >
                <span className="flex h-full w-full items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--carbon"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10z"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      <MenuCarousel
        ref={carouselRef}
        items={MENU_ITEMS}
        ariaLabel={title}
        itemClassName="shrink-0 snap-start"
        className="relative mb-6 md:mb-0"
        renderItem={(item, index) => {
          const menuItem = item as MenuItem;

          return (
            <MenuCard
              key={`${menuItem.id}-${index}`}
              item={menuItem}
              className={cardClassName}
            />
          );
        }}
      />
    </section>
  );
}
