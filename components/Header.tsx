'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#faf8f4] border-b border-stone-300">
        <div className="h-[3px] bg-stone-950" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-1.5 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="cursor-pointer flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                aria-label="Abrir menú"
              >
                <Menu size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] hidden sm:inline">
                  Secciones
                </span>
              </button>
              <span className="text-stone-300 hidden sm:inline">|</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-400 hidden sm:inline">
                Buenos Aires, Argentina
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              Actualizado hoy
            </div>
          </div>

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

        <div className="h-px bg-stone-300" />
      </header>

      <Suspense fallback={null}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </Suspense>
    </>
  )
}
