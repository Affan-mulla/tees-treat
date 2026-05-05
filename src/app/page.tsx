import Navbar from "@/components/layout/Navbar";
import CustomCakeBanner from "@/components/sections/CustomCakeBanner";
import FeaturedProducts from "@/components/sections/FeaturedProduct";
import Footer from "@/components/sections/Footer";

import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import WhatWeDo from "@/components/sections/WhatWeDo";

export default function Home() {
  return (
    <main className="relative z-10 flex flex-col  overflow-hidden">
      <Hero />
      <WhatWeDo />
      <FeaturedProducts />
      <Testimonials/>
      <CustomCakeBanner />
    </main>
  );
}
