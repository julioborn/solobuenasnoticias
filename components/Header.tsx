'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#faf8f4] border-b border-stone-300">
      {/* thick rule */}
      <div className="h-0.75 bg-stone-950" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* meta row */}
        <div className="flex items-center justify-between py-1.5 border-b border-stone-200">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-400">
            Argentina
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            Actualizado hoy
          </div>
        </div>

        {/* masthead */}
        <div className="py-3 text-center">
          <Link href="/" className="inline-block group">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-black text-stone-950 tracking-tight leading-none group-hover:text-red-700 transition-colors duration-300">
              Solo Buenas Noticias
            </h1>
          </Link>
          <p className="text-[9px] uppercase tracking-[0.5em] text-stone-400 mt-1">
            Noticias positivas de Argentina
          </p>
        </div>
      </div>

      {/* thin rule */}
      <div className="h-px bg-stone-300" />
    </header>
  )
}
