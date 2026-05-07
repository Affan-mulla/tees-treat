"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MenuItem = {
  name: string;
  description: string;
  price: string;
  accent: string;
  tag?: string;
  image?: string;
};

type MenuGroup = {
  title: string;
  note: string;
  items: MenuItem[];
};

const weekendSpecials: MenuItem[] = [
  {
    name: "Peanut Butter Jelly",
    description: "Sweet, nostalgic, giving childhood but make it coffee.",
    price: "Weekend pour",
    accent: "#F2C4CE",
    tag: "Hot or iced",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80&fit=crop",
    // Nathan Dumlao — iced coffee with cream swirl
  },
  {
    name: "Maple Cinnamon",
    description: "Warm, cozy, and the whole shop smells like a dream kitchen.",
    price: "Weekend pour",
    accent: "#E8470A",
    tag: "Cold foam",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80&fit=crop",
    // warm latte overhead
  },
  {
    name: "Cookies & Cream",
    description: "Creamy, chocolatey, straight up comfort in a cup.",
    price: "Weekend pour",
    accent: "#FFF5EC",
    tag: "Best iced",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&fit=crop",
    // iced mocha dark glass
  },
  {
    name: "Rhubarb & Custard",
    description: "Tangy, sweet, and a little bit iconic.",
    price: "Weekend pour",
    accent: "#F6AEC0",
    tag: "Cafe favourite",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&fit=crop",
    // pink latte overhead cafe table
  },
  {
    name: "Matcha Cloud",
    description: "For the matcha regulars: green, silky, not forgotten.",
    price: "Weekend pour",
    accent: "#B7D7A8",
    tag: "Matcha",
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=600&q=80&fit=crop",
    // green matcha latte
  },
];

const menuGroups: MenuGroup[] = [
  {
    title: "Coffee",
    note: "Daily bar pours, placeholder menu copy.",
    items: [
      {
        name: "Espresso",
        description: "Short, clean, and pulled fresh to order.",
        price: "3.00",
        accent: "#E8470A",
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80&fit=crop",
        // espresso shot close up
      },
      {
        name: "Flat White",
        description: "Velvety milk, balanced espresso, everyday favourite.",
        price: "3.60",
        accent: "#F2C4CE",
        image: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=600&q=80&fit=crop",
        // flat white latte art overhead
      },
      {
        name: "Latte",
        description: "Smooth coffee with a longer, creamier finish.",
        price: "3.80",
        accent: "#F4D38A",
        image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&q=80&fit=crop",
        // tall latte glass
      },
      {
        name: "Mocha",
        description: "Chocolate comfort with a proper coffee backbone.",
        price: "4.10",
        accent: "#8E5B48",
        image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80&fit=crop",
        // mocha with cream
      },
    ],
  },
  {
    title: "Bakes",
    note: "Counter changes daily, placeholder menu copy.",
    items: [
      {
        name: "Cookie Stack",
        description: "Soft middle, crisp edge, rotating flavours.",
        price: "3.50",
        accent: "#E8470A",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&fit=crop",
        // stack of cookies
      },
      {
        name: "Cake Slice",
        description: "Tall sponge, generous filling, made for sharing.",
        price: "4.80",
        accent: "#F2C4CE",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80&fit=crop",
        // tall layered cake slice
      },
      {
        name: "Brownie",
        description: "Dense, glossy, chocolate-heavy counter staple.",
        price: "3.80",
        accent: "#5B3A2E",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80&fit=crop",
        // close up brownie texture
      },
      {
        name: "Cinnamon Bun",
        description: "Soft swirl, warm spice, icing tucked into every fold.",
        price: "4.20",
        accent: "#D79655",
        image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=80&fit=crop",
        // cinnamon roll overhead
      },
    ],
  },
  {
    title: "Cold Bar",
    note: "Iced drinks, foam, and seasonal extras.",
    items: [
      {
        name: "Iced Latte",
        description: "Classic over ice with your choice of milk.",
        price: "4.00",
        accent: "#A8DADC",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80&fit=crop",
        // iced latte tall glass
      },
      {
        name: "Cold Foam Topper",
        description: "Silky sweet cap for the weekend lineup.",
        price: "+0.80",
        accent: "#FFF5EC",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&fit=crop",
        // cold foam close up
      },
      {
        name: "Iced Matcha",
        description: "Bright green tea, soft milk, clean finish.",
        price: "4.50",
        accent: "#B7D7A8",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&fit=crop",
        // iced matcha green
      },
      {
        name: "House Cooler",
        description: "Refreshing seasonal sip from the fridge.",
        price: "3.90",
        accent: "#F2C4CE",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80&fit=crop",
        // colourful cold drink
      },
    ],
  },
];

const serviceNotes = [
  "Open Friday, Saturday, and Sunday.",
  "Specials are available this weekend while the counter lasts.",
  "Most drinks can be made hot or iced.",
  "Ask at the till for allergens and the day's full bake list.",
];

function clipIdFromName(name: string) {
  return `clip-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export default function MenuPage() {
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const hoverCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const heroItems = gsap.utils.toArray("[data-hero-item]", heroRef.current);

      gsap.fromTo(
        heroItems,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
        },
      );

      sectionRefs.current.forEach((section) => {
        const sectionItems = section.querySelectorAll("[data-reveal]");

        gsap.fromTo(
          sectionItems,
          { y: 52, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.055,
            scrollTrigger: {
              trigger: section,
              start: "top 74%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.to("[data-menu-marquee]", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-specials-section]",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      cardRefs.current.forEach((card) => {
        const wash = card.querySelector<SVGRectElement>("[data-card-wash]");
        const content = card.querySelector<HTMLElement>("[data-card-content]");
        const index = card.querySelector<HTMLElement>("[data-card-index]");

        gsap.set(wash, { scaleY: 0, transformOrigin: "50% 100%" });

        const enter = () => {
          gsap.to(card, {
            y: -8,
            duration: 0.35,
            ease: "power3.out",
          });
          gsap.to(wash, {
            scaleY: 1,
            duration: 0.45,
            ease: "power3.out",
          });
          gsap.to(content, {
            x: 8,
            duration: 0.35,
            ease: "power3.out",
          });
          gsap.to(index, {
            rotate: -8,
            scale: 1.08,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        const leave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          });
          gsap.to(wash, {
            scaleY: 0,
            duration: 0.4,
            ease: "power3.inOut",
          });
          gsap.to(content, {
            x: 0,
            duration: 0.35,
            ease: "power3.out",
          });
          gsap.to(index, {
            rotate: 0,
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        card.addEventListener("focusin", enter);
        card.addEventListener("focusout", leave);

        hoverCleanups.push(() => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
          card.removeEventListener("focusin", enter);
          card.removeEventListener("focusout", leave);
        });
      });
    }, pageRef);

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  const registerSection = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const registerCard = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <main ref={pageRef} className="relative overflow-hidden bg-cream text-chalk">
      <section
        ref={heroRef}
        className="relative min-h-[88vh] px-5 pt-36 pb-16 md:px-8 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(340px,0.42fr)] lg:items-end">
          <div className="flex flex-col gap-8">
            <p
              data-hero-item
              className="font-outfit text-xs font-semibold uppercase tracking-[3px] text-orange-primary"
            >
              Tee&apos;s Treats menu
            </p>

            <div data-hero-item className="overflow-hidden">
              <h1 className="max-w-4xl font-caprasimo text-6xl leading-[0.94] text-chalk md:text-8xl lg:text-9xl">
                Menu
              </h1>
            </div>

            <p
              data-hero-item
              className="max-w-2xl font-dmsans text-xl leading-[1.3] tracking-normal text-chalk/70 md:text-2xl"
            >
              Small-batch coffee, weekend-only flavour drops, and a counter
              full of bakes worth planning your route around.
            </p>
          </div>

          <div
            data-hero-item
            className="border-y border-chalk/15 py-6 lg:mb-4"
          >
            <div className="grid grid-cols-3 gap-4">
              {["Hot", "Iced", "Foam"].map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <span className="font-caprasimo text-3xl leading-none text-orange-primary md:text-4xl">
                    {item}
                  </span>
                  <span className="font-outfit text-[11px] font-semibold uppercase tracking-[2px] text-chalk/45">
                    Available
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          data-hero-item
          className="absolute bottom-0 left-0 right-0 border-y border-orange-hover bg-orange-primary text-cream"
        >
          <div className="flex overflow-hidden">
            <div className="flex min-w-max items-center gap-8 py-4 font-caprasimo text-xl leading-none md:text-2xl">
              {Array.from({ length: 2 }).map((_, group) => (
                <div
                  key={group}
                  data-menu-marquee
                  className="flex min-w-max items-center gap-8"
                >
                  <span>Weekend specials</span>
                  <span className="text-chalk">Daily bakes</span>
                  <span className="text-cream">Matcha</span>
                  <span className="text-chalk">Coffee house</span>
                  <span className="text-blush">don&apos;t walk, RUN</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={registerSection}
        data-specials-section
        className="relative bg-chalk px-5 py-20 text-cream md:px-8 md:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.72fr_0.48fr] md:items-end">
            <div data-reveal className="flex flex-col gap-5">
              <p className="font-outfit text-xs font-semibold uppercase tracking-[3px] text-orange-primary">
                This weekend only
              </p>
              <h2 className="max-w-3xl font-caprasimo text-5xl leading-[0.98] md:text-7xl">
                Specials with main character energy.
              </h2>
            </div>

            <p
              data-reveal
              className="font-dmsans text-lg leading-[1.55] text-cream/68"
            >
              Hot or iced, cold foam on top, obviously. Matcha regulars are in
              the lineup too.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-cream/12 bg-cream/12 md:grid-cols-2 xl:grid-cols-5">
            {weekendSpecials.map((item, index) => (
              <MenuCard
                key={item.name}
                item={item}
                index={index}
                variant="dark"
                registerCard={registerCard}
              />
            ))}
          </div>

          <div
            data-reveal
            className="mt-10 flex flex-col gap-4 border-t border-cream/12 pt-8 md:flex-row md:items-center md:justify-between"
          >
            <p className="max-w-3xl font-caprasimo text-3xl leading-tight text-cream md:text-4xl">
              Be honest, one cup or the full lineup?
            </p>
            <p className="font-outfit text-xs font-semibold uppercase tracking-[3px] text-orange-primary">
              Available this weekend
            </p>
          </div>
        </div>
      </section>

      <section
        ref={registerSection}
        className="relative px-5 py-20 md:px-8 md:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.55fr_0.45fr] md:items-end">
            <div data-reveal className="flex flex-col gap-5">
              <p className="font-outfit text-xs font-semibold uppercase tracking-[3px] text-orange-primary">
                Daily menu
              </p>
              <h2 className="font-caprasimo text-5xl leading-none md:text-7xl">
                Coffee, bakes, cold stuff.
              </h2>
            </div>
            <p
              data-reveal
              className="font-dmsans text-lg leading-[1.55] text-chalk/62"
            >
              Placeholder daily items for now, structured so the real menu can
              drop in cleanly without changing the page layout.
            </p>
          </div>

          <div className="grid gap-8">
            {menuGroups.map((group) => (
              <section
                key={group.title}
                data-reveal
                className="grid gap-px overflow-hidden border border-chalk/12 bg-chalk/12 lg:grid-cols-[280px_1fr]"
              >
                <div className="flex min-h-56 flex-col justify-between bg-cream p-6 md:p-8">
                  <div>
                    <h3 className="font-caprasimo text-4xl leading-none text-chalk md:text-5xl">
                      {group.title}
                    </h3>
                    <p className="mt-4 max-w-xs font-dmsans text-base leading-[1.5] text-chalk/55">
                      {group.note}
                    </p>
                  </div>
                  <span className="mt-8 font-outfit text-[11px] font-semibold uppercase tracking-[2px] text-orange-primary">
                    Daily counter
                  </span>
                </div>

                <div className="grid gap-px bg-chalk/12 md:grid-cols-2 xl:grid-cols-4">
                  {group.items.map((item, index) => (
                    <MenuCard
                      key={item.name}
                      item={item}
                      index={index}
                      variant="light"
                      registerCard={registerCard}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={registerSection}
        className="relative bg-blush px-5 py-16 md:px-8 md:py-20 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-chalk/12 bg-chalk/12 md:grid-cols-[0.62fr_0.38fr]">
          <div data-reveal className="bg-blush p-6 md:p-10">
            <p className="font-outfit text-xs font-semibold uppercase tracking-[3px] text-chalk/50">
              How it works
            </p>
            <h2 className="mt-5 max-w-2xl font-caprasimo text-5xl leading-none text-chalk md:text-7xl">
              Weekend specials move fast.
            </h2>
          </div>

          <div className="grid gap-px bg-chalk/12">
            {serviceNotes.map((note, index) => (
              <div
                key={note}
                data-reveal
                className="flex gap-5 bg-blush p-6 md:p-8"
              >
                <span className="font-caprasimo text-3xl leading-none text-orange-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-dmsans text-lg leading-[1.45] text-chalk/72">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function MenuCard({
  item,
  index,
  variant,
  registerCard,
}: {
  item: MenuItem;
  index: number;
  variant: "dark" | "light";
  registerCard: (el: HTMLDivElement | null) => void;
}) {
  const clipId = clipIdFromName(`${variant}-${item.name}`);
  const isDark = variant === "dark";

  return (
    <div
      ref={registerCard}
      tabIndex={0}
      data-reveal
      className={[
        "group relative min-h-[310px] overflow-hidden p-6 outline-none md:p-7",
        "focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2",
        isDark
          ? "bg-chalk text-cream focus-visible:ring-offset-chalk"
          : "bg-cream text-chalk focus-visible:ring-offset-cream",
      ].join(" ")}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d="M0,0.2 C0.14,0.05 0.35,0.02 0.52,0.12 C0.68,0.22 0.78,0.08 1,0.16 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
        <image
        data-card-wash
          href={item.image}
          x="0"
          y="0"
          width="400"
          height="400"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
          opacity={isDark ? 0.3 : 0.5 }
        />
      </svg>

      <div
        data-card-content
        className="relative z-10 flex h-full min-h-75 flex-col justify-between"
      >
        <div className="flex items-start justify-between gap-5">
          <span
            data-card-index
            className={[
              "inline-flex h-12 w-12 shrink-0 items-center justify-center border font-caprasimo text-2xl leading-none",
              isDark ? "border-cream/18 text-cream" : "border-chalk/15 text-chalk",
            ].join(" ")}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className={[
              "font-outfit text-[11px] font-semibold uppercase tracking-[2px]",
              isDark ? "text-cream/50" : "text-chalk/45",
            ].join(" ")}
          >
            {item.tag ?? "Daily"}
          </span>
        </div>

        <span
          className={[
            "w-fit border px-3 py-2 font-outfit text-[10px] font-semibold uppercase tracking-[2px] lg:hidden",
            isDark
              ? "border-cream/14 text-cream/60"
              : "border-chalk/12 text-chalk/55",
          ].join(" ")}
        >
          Tap for image
        </span>

        <div>
          <h3 className="font-caprasimo text-4xl leading-[0.98]">
            {item.name}
          </h3>
          <p
            className={[
              "mt-5 max-w-sm font-dmsans text-base leading-[1.55]",
              isDark ? "text-cream/68" : "text-chalk/62",
            ].join(" ")}
          >
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-current/12 pt-5">
          <span className="font-outfit text-xs font-semibold uppercase tracking-[2px] opacity-55">
           	£ {item.price}
          </span>
          <span className="h-3 w-3 rounded-full" style={{ background: item.accent }} />
        </div>
      </div>
    </div>
  );
}
