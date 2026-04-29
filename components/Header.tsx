'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌟</span>
            <div>
              <span className="font-bold text-xl text-green-700 leading-none block">
                Solo Buenas Noticias
              </span>
              <span className="text-xs text-green-500 leading-none">Argentina · Lo mejor del día</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="hidden sm:flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Actualizado hoy
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
