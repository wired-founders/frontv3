// src\config\metadata.ts
import type { Metadata } from "next";

export const siteMetadata: Metadata = {
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
