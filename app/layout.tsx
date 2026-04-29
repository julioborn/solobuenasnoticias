import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1">{children}</div>
        <footer className="mt-16 border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <span>🌟 Solo Buenas Noticias · Argentina</span>
            <span>Noticias filtradas por IA · Actualizado cada 2 horas</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
