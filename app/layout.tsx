import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Solo Buenas Noticias · Argentina",
  description: "Las noticias más positivas e inspiradoras de Argentina, filtradas por IA cada día.",
  keywords: "noticias positivas, argentina, buenas noticias, ciencia, deportes, cultura",
  openGraph: {
    title: "Solo Buenas Noticias · Argentina",
    description: "Las noticias más positivas e inspiradoras de Argentina.",
    locale: "es_AR",
    type: "website",
  },
};

import Header from '@/components/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf8f4] text-stone-900">
        <Header />
        <div className="flex-1">{children}</div>
        <footer className="mt-16 border-t-2 border-stone-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[11px] uppercase tracking-widest text-stone-400 font-medium">
              Solo Buenas Noticias · Argentina
            </span>
            <span className="text-[11px] uppercase tracking-widest text-stone-400">
              Noticias filtradas por IA · Actualizado cada 2 horas
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
