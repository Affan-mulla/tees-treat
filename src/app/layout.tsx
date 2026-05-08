import type { Metadata } from "next";
import { Caprasimo, Outfit, DM_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import { PreloaderProvider } from "@/components/PreloaderProvider";
import "@/app/globals.css";
import Footer from "@/components/sections/Footer";

const caprasimo = Caprasimo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caprasimo",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  weight: ["400", "500"],
  display: "swap",
});

// ─── SITE-WIDE METADATA ──────────────────────────────────────────────────────
// Each page can override title/description via its own `export const metadata`.
// This object acts as the fallback / shared defaults.
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL = "https://tees-treat.vercel.app"; // ← update once domain is live

export const metadata: Metadata = {
  // ── Basics ──────────────────────────────────────────────────────────────
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tee's Treats — Coffee House & Bakeshop · Rutherglen, Glasgow",
    template: "%s | Tee's Treats",
  },
  description:
    "Small-batch custom cakes, specialty coffee and fresh bakes. Open Friday, Saturday & Sunday at 90 Stonelaw Road, Rutherglen, Glasgow. Dogs always welcome.",
  keywords: [
    "coffee shop Rutherglen",
    "bakery Rutherglen",
    "custom cakes Glasgow",
    "cake shop Glasgow",
    "coffee house Rutherglen",
    "dog friendly cafe Glasgow",
    "custom birthday cakes Rutherglen",
    "artisan bakery Glasgow",
    "Tee's Treats",
    "weekend coffee Rutherglen",
    "bakes Glasgow",
  ],

  // ── Canonical & Alternates ──────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },

  // ── Open Graph ──────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Tee's Treats",
    title: "Tee's Treats — Coffee House & Bakeshop · Rutherglen",
    description:
      "Custom cakes, specialty coffee and fresh bakes in Rutherglen, Glasgow. Open Fri, Sat & Sun. Dogs always welcome.",
    images: [
      {
        url: "/og-image.jpg", // place a 1200×630 jpg at /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Tee's Treats — Coffee House & Bakeshop in Rutherglen, Glasgow",
      },
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Tee's Treats — Coffee House & Bakeshop · Rutherglen",
    description:
      "Custom cakes, specialty coffee and fresh bakes in Rutherglen, Glasgow. Open Fri, Sat & Sun.",
    images: ["/og-image.jpg"],
  },

  // ── Robots ──────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification (add once you've verified Search Console) ─────────────
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Ky0qIfMeU_mpTMGdF8bKz7vGIeDj81FfpP7BXZhB9kY" />
        <link rel="preload" href="/cookie.webp" as="image" type="image/webp" />

        {/* ── JSON-LD Structured Data — LocalBusiness ──────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CafeOrCoffeeShop",
              name: "Tee's Treats",
              description:
                "Small-batch custom cakes, specialty coffee and fresh bakes in Rutherglen, Glasgow.",
              url: SITE_URL,
              telephone: "+441414712727",
              email: "hello@teestreats.co.uk", // update if different
              address: {
                "@type": "PostalAddress",
                streetAddress: "90 Stonelaw Road",
                addressLocality: "Rutherglen",
                addressRegion: "Glasgow",
                postalCode: "G73 3ED",
                addressCountry: "GB",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 55.8298,
                longitude: -4.2154,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Friday",
                  opens: "09:00",
                  closes: "17:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "17:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "10:00",
                  closes: "16:00",
                },
              ],
              servesCuisine: ["Coffee", "Cakes", "Pastries", "Bakery"],
              priceRange: "£",
              currenciesAccepted: "GBP",
              paymentAccepted: "Cash, Credit Card",
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Dog Friendly", value: true },
                { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
              ],
              sameAs: [
                "https://www.instagram.com/teestreatsrutherglen/",
                "https://www.facebook.com/teestreatsrutherglen",
                "https://www.tiktok.com/@teestreatsrutherglen",
              ],
              image: `${SITE_URL}/og-image.jpg`,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                reviewCount: "4",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
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