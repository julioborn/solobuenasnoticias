'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, ChevronDown, ChevronRight } from 'lucide-react'
import { CATEGORIES } from '@/types'
import { CATEGORY_ICONS } from '@/lib/categories'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'Todas'
  const activeSubcategory = searchParams.get('subcategory')

  const [subcats, setSubcats] = useState<Record<string, string[]>>({})
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/subcategories')
      .then(r => r.json())
      .then(setSubcats)
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (activeCategory !== 'Todas') setExpanded(activeCategory)
  }, [activeCategory])

  function navigate(category: string, subcategory?: string) {
    const params = new URLSearchParams()
    if (category !== 'Todas') params.set('category', category)
    if (subcategory) params.set('subcategory', subcategory)
    router.push(params.toString() ? `/?${params}` : '/')
    onClose()
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-68 bg-[#faf8f4] border-r-2 border-stone-950 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* header del drawer */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <div>
            <div className="h-[3px] w-6 bg-stone-950 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">
              Secciones
            </span>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-1 text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 overflow-y-auto py-2">
          {/* Todas */}
          <button
            onClick={() => navigate('Todas')}
            className={`cursor-pointer w-full flex items-center gap-2.5 px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors ${
              activeCategory === 'Todas'
                ? 'text-red-600 bg-red-50 border-l-2 border-red-600'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100 border-l-2 border-transparent'
            }`}
          >
            Todas las noticias
          </button>

          <div className="mx-5 h-px bg-stone-200 my-2" />

          {CATEGORIES.map(cat => {
            const Icon = CATEGORY_ICONS[cat.name]
            const catSubcats = subcats[cat.name] ?? []
            const hasSubcats = catSubcats.length > 0
            const isActiveCategory = activeCategory === cat.name
            const isExpanded = expanded === cat.name

            return (
              <div key={cat.name}>
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      if (hasSubcats) {
                        setExpanded(isExpanded ? null : cat.name)
                        navigate(cat.name)
                      } else {
                        navigate(cat.name)
                      }
                    }}
                    className={`cursor-pointer flex-1 flex items-center gap-2.5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors border-l-2 ${
                      isActiveCategory && !activeSubcategory
                        ? 'text-red-600 bg-red-50 border-red-600'
                        : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100 border-transparent'
                    }`}
                  >
                    {Icon && (
                      <Icon
                        size={13}
                        className={isActiveCategory && !activeSubcategory ? 'text-red-600' : cat.color}
                      />
                    )}
                    {cat.name}
                  </button>
                  {hasSubcats && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : cat.name)}
                      className="cursor-pointer px-4 py-2.5 text-stone-400 hover:text-stone-700 transition-colors"
                    >
                      {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </button>
                  )}
                </div>

                {hasSubcats && isExpanded && (
                  <div className="ml-5 border-l border-stone-300">
                    {catSubcats.map(sub => {
                      const isActiveSub = isActiveCategory && activeSubcategory === sub
                      return (
                        <button
                          key={sub}
                          onClick={() => navigate(cat.name, sub)}
                          className={`cursor-pointer w-full flex items-center gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                            isActiveSub
                              ? 'text-red-600 bg-red-50'
                              : 'text-stone-400 hover:text-stone-800 hover:bg-stone-100'
                          }`}
                        >
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isActiveSub ? 'bg-red-600' : 'bg-stone-400'}`} />
                          {sub}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </>
  )
}
