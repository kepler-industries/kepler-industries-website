import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kepler Industries — Studio for ambitious digital products",
  description:
    "Kepler Industries is an independent creative studio designing and building clean, ambitious digital products — interfaces, brands and software at the edge of what's possible.",
  metadataBase: new URL("https://www.kepler-industries.com"),
  openGraph: {
    title: "Kepler Industries — Studio for ambitious digital products",
    description:
      "An independent studio designing and building digital products with care, taste and a long view.",
    url: "https://www.kepler-industries.com",
    siteName: "Kepler Industries",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kepler Industries",
    description:
      "Studio for ambitious digital products. Web · App · Product.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
