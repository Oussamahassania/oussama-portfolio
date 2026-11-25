import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { basePath } from "@/lib/paths";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = `https://oussamahassania.github.io${basePath}`;
const pageUrl = `${siteUrl}/`;
const ogImageUrl = `${siteUrl}/opengraph-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Oussama Hassania — AI, Software & Security",
    template: "%s · Oussama Hassania",
  },
  description:
    "Portfolio of Oussama Hassania — AI & Data Engineering student building intelligent systems, secure backends and computer-vision applications.",
  keywords: [
    "Oussama Hassania",
    "AI Engineer",
    "Machine Learning",
    "Data Engineering",
    "Spring Boot",
    "Cybersecurity",
    "Computer Vision",
    "Portfolio",
  ],
  authors: [{ name: "Oussama Hassania" }],
  creator: "Oussama Hassania",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: pageUrl,
    siteName: "Oussama Hassania",
    title: "Oussama Hassania — Building Intelligent Systems",
    description:
      "AI & Data Engineering student. Machine learning, secure backend systems and cybersecurity.",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Oussama Hassania — Building Intelligent Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oussama Hassania — Building Intelligent Systems",
    description:
      "AI & Data Engineering student. Machine learning, secure backend systems and cybersecurity.",
    images: [ogImageUrl],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="grain relative min-h-screen bg-ink text-fg antialiased">
        {children}
      </body>
    </html>
  );
}
