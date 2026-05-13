"use client";

import Image from "next/image";
import Link from "next/link";
import type { MenuItem } from "../menu-types";

interface MenuCardProps {
  item: MenuItem;
  className?: string;
}

export default function MenuCard({ item, className = "" }: MenuCardProps) {
  return (
    <div
      className={`w-fit min-w-[250px] max-w-[250px] select-none rounded-4xl bg-chalk p-2  shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_1px_0px_rgba(0,0,0,0.05),0px_2px_2px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] ${className}`}
    >
      <div className="relative w-full max-w-[250px] h-[250px] overflow-hidden rounded-3xl">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="200px"
          draggable={false}
          className="object-cover select-none "
        />
      </div>
      <div className="p-3 divide-x divide-cream/50 flex">
        <div className="w-fit pr-3">
          <h2 className="text-xl tracking-tight">{item.title}</h2>
          <div className="flex gap-2 items-center mt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs ${item.id.includes("special") ? "bg-orange-primary text-cream" : "bg-cream text-chalk"} px-2 py-0.5 rounded-full`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="w-fit pl-3">
          <p className="text-2xl"> {item.price}</p>
          <Link
            href={item.href}
            className=" inline-block text-sm  transition-colors  underline underline-offset-4 "
          >
            visit Now
          </Link>
        </div>
      </div>
    </div>
  );
}
