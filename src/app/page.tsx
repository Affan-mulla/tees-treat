import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import FeaturedProducts from "@/components/sections/FeaturedProduct";
import Testimonials from "@/components/sections/Testimonials";
import CustomCakeBanner from "@/components/sections/CustomCakeBanner";

export const metadata: Metadata = {
  title: "Tee's Treats — Coffee House & Bakeshop · Rutherglen, Glasgow",
  description:
    "Small-batch custom cakes, specialty coffee and weekend bakes in Rutherglen, Glasgow. Open every Friday, Saturday & Sunday. Dogs always welcome.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tee's Treats — Coffee House & Bakeshop · Rutherglen, Glasgow",
    description:
      "Small-batch custom cakes, specialty coffee and weekend bakes in Rutherglen, Glasgow. Open every Friday, Saturday & Sunday.",
    url: "/",
  },
};

export default function Home() {
  return (
    <main className="relative z-10 flex flex-col overflow-hidden">
      <Hero />
      <WhatWeDo />
      <FeaturedProducts />
      <Testimonials />
      <CustomCakeBanner />
    </main>
  );
}