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
        
        {/* Footer — visible on all pages */}
        <Footer />
      </body>
    </html>
  );
}
