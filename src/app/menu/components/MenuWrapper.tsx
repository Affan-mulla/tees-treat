"use client";

import { useRef } from "react";
import MenuCarousel, { MenuCarouselHandle } from "@/components/MenuCarousel";
import useMobile from "@/hooks/useMobile";
import MenuCard from "./MenuCard";
import type { MenuItem } from "../menu-types";

interface MenuWrapperProps {
  MENU_ITEMS: MenuItem[];
  title: string;
}

export default function MenuWrapper({ MENU_ITEMS, title }: MenuWrapperProps) {
  const carouselRef = useRef<MenuCarouselHandle | null>(null);
  const isMobile = useMobile();

  return (
    <div className="md:mx-auto  max-w-7xl relative  ">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-[clamp(2rem,4vw,2.5rem)] font-bold text-chalk">
          <span className="text-orange-primary">✦ </span>
          {title}
        </h1>
        {!isMobile && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => carouselRef.current?.scrollPrev()}
              className="h-9 w-9 rounded-full border border-chalk/20 text-chalk transition-colors hover:border-chalk"
              aria-label="Scroll weekly specials left rotate-180"
            >
              <span className="rotate-180 flex items-center justify-center w-full h-full">
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
              className="h-9 w-9 rounded-full border border-chalk/20 text-chalk transition-colors hover:border-chalk"
              aria-label="Scroll weekly specials right"
            >
              <span className="flex items-center justify-center w-full h-full">
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
      <MenuCarousel
        ref={carouselRef}
        items={MENU_ITEMS}
        ariaLabel="Weekly specials"
        itemClassName="shrink-0"
        className="relative"
        renderItem={(item, index) => {
          const menuItem = item as MenuItem;

          return <MenuCard key={`${menuItem.id}-${index}`} item={menuItem} />;
        }}
      />
    </div>
  );
}
