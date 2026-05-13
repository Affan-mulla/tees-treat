"use client";

export const HERO_LOGO_TARGET_SELECTOR = "[data-hero-logo-target]";

let logoMarkupPromise: Promise<string> | null = null;

export function getLogoMarkup() {
  if (!logoMarkupPromise) {
    logoMarkupPromise = fetch("/logo.svg").then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load logo.svg: ${response.status}`);
      }

      return response.text();
    });
  }

  return logoMarkupPromise;
}

export function prepareLogoPaths(svg: SVGSVGElement) {
  const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));

  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.dataset.fill = path.getAttribute("fill") || "#1A1A1A";
    path.style.stroke = "#e8470a";
    path.style.strokeWidth = "1.2";
    path.style.fill = "none";
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });

  return paths;
}
