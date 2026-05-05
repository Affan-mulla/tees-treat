// src/app/layout.tsx
// Add PageTransition as a sibling to children — NOT wrapping them

import { Caprasimo, Outfit, DM_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import "@/app/globals.css";
import Footer from "@/components/sections/Footer";

const caprasimo = Caprasimo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caprasimo",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  weight: ["400", "500"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${caprasimo.variable}
          ${outfit.variable}
          ${dmSans.variable}
          bg-cream text-chalk font-dmsans relative
        `}
      >
        {/* Page transition overlay — sits above everything */}
        <PageTransition />

        {/* Smooth scrolling + GSAP ScrollTrigger sync */}
        <SmoothScroll />

        {/* Navbar — fixed, always visible */}
        <Navbar />

        {/* Page content */}
        {children}
        {/* Footer — sticky at bottom, revealed as main scrolls away */}
        <div className="sticky bottom-0 z-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}

// ─── page.tsx structure reminder ──────────────────────────────────────────
//
// export default function Home() {
//   return (
//     <div className="relative bg-[#1A1A1A]">
//       <main className="relative z-10 flex flex-col bg-cream">
//         <Hero animateIn={preloaderDone} />
//         <WhatWeDo />
//         <FeaturedProducts />
//         <div
//           className="relative z-20 h-12 -mt-12 bg-[#FFF5EC]"
//           style={{ borderRadius: "48px 48px 0 0" }}
//         />
//         <CustomCakeBanner />
//       </main>
//       <div className="sticky bottom-0 z-0">
//         <Footer />
//       </div>
//     </div>
//   );
// }
