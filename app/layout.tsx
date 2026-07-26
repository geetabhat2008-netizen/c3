import type { Metadata } from "next";
import { Playfair_Display, Space_Mono, Lora } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-src",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-mono-src",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body-src",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CrownCalm — The Sanctuary Suite",
  description:
    "The Sanctuary Suite coordinates five migraine-support mechanisms in one structured daily protocol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${spaceMono.variable} ${lora.variable}`}
    >
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
