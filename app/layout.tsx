import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Rianne Collective - Handcrafted Crochet from Kupang, NTT",
  description:
    "Produk rajutan tangan buatan Kupang, Nusa Tenggara Timur. Handcrafted crochet, made with warmth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${montserrat.variable} min-h-screen bg-surface text-on-surface font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
