// src\config\metadata.ts

/**
 1. Browser Tab()
    - icon      [svg, png]    32×32 or scalable SVG
    - shortcut  [.ico]        16×16 or 32×32
    - apple     [.png]        180×180
 2. openGraph
 3. twitter
 */
import type { Metadata } from "next";
import { clientUrl } from "@/config/env.client";
export const siteMetadata: Metadata = {
  metadataBase: new URL(clientUrl),
  title: "Kordor AI",
  description: "AI tools for smarter marketing decisions",
  icons: {
    icon: "/kordor-logo.svg",
    shortcut: "/kordor-favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Kordor AI",
    description: "AI tools for smarter marketing decisions",
    url: "https://kordor.com",
    siteName: "Kordor AI",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kordor AI",
    description: "AI tools for smarter marketing decisions",
    images: ["/og-image.png"],
  },
};
