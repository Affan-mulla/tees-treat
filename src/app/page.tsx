import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import FeaturedProducts from "@/components/sections/FeaturedProduct";
import Testimonials from "@/components/sections/Testimonials";
import CustomCakeBanner from "@/components/sections/CustomCakeBanner";

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
