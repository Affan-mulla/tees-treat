import type { Metadata } from "next";
import { Caprasimo, Outfit, DM_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import { PreloaderProvider } from "@/components/PreloaderProvider";
import "@/app/globals.css";
import Footer from "@/components/sections/Footer";

/**
 * Font loading strategy:
 * - next/font handles subsetting, self-hosting, and preloading automatically.
 * - display: "swap" prevents invisible text during font load (FOIT → FOUT).
 * - Outfit: removed weight "500" — grep shows only 400/600/700 used in classes.
 *   Saving one weight = ~15kb less per font file requested.
 */

const caprasimo = Caprasimo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caprasimo",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  // 500 removed — only font-normal(400), font-semibold(600), font-bold(700)
  // are actually used. Check with: grep -r "font-medium" src/ (font-medium = 500)
  // Add it back if you use font-medium anywhere.
  weight: ["400", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tee's Treats — Coffee House & Bakeshop · Rutherglen",
  description:
    "Custom cakes, specialty coffee and fresh bakes. Open Friday, Saturday & Sunday in Rutherglen, Glasgow. Dogs always welcome.",
  openGraph: {
    title: "Tee's Treats",
    description: "Coffee House & Bakeshop · Rutherglen, Glasgow",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          Preload the LCP image (cookie.webp used in preloader + hero).
          This hint fires before React hydrates, shaving ~200-400ms off LCP.
          Only preload images above the fold — preloading everything is worse.
        */}
        <link
          rel="preload"
          href="/cookie.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body
        className={`
          ${caprasimo.variable}
          ${outfit.variable}
          ${dmSans.variable}
          bg-cream text-chalk font-dmsans relative
        `}
      >
        <PreloaderProvider>
          <PageTransition />
          <SmoothScroll />
          <Navbar />
          {children}
            <Footer />
        </PreloaderProvider>
      </body>
    </html>
  );
}