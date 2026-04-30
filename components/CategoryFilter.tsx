'use client'

import { useState, useEffect } from 'react'
import type { News, NewsCategory } from '@/types'
import { CATEGORIES } from '@/types'
import { CATEGORY_ICONS } from '@/lib/categories'
import NewsCard from './NewsCard'

interface CategoryFilterProps {
  initialNews: News[]
  availableCategories: string[]
}

export default function CategoryFilter({ initialNews, availableCategories }: CategoryFilterProps) {
  const available = new Set(availableCategories)
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'Todas'>('Todas')
  const [news, setNews] = useState<News[]>(initialNews)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchByCategory() {
      if (activeCategory === 'Todas') {
        setNews(initialNews)
        return
      }
      setLoading(true)
      try {
        const res = await fetch(`/api/news?category=${encodeURIComponent(activeCategory)}&limit=24`)
        if (res.ok) {
          const data = await res.json()
          setNews(data.news ?? [])
        }
      } catch {
        setNews([])
      } finally {
        setLoading(false)
      }
    }
    fetchByCategory()
  }, [activeCategory, initialNews])

  const AllIcon = CATEGORY_ICONS['Todas']

  return (
    <section className="space-y-6">
      {/* category nav */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide border-b border-stone-200">
        <button
          onClick={() => setActiveCategory('Todas')}
          className={`cursor-pointer flex items-center gap-1.5 px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-150 border-b-2 -mb-px ${
            activeCategory === 'Todas'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-stone-400 hover:text-stone-700 hover:border-stone-400'
          }`}
        >
          {AllIcon && <AllIcon size={12} />}
          Todas
        </button>
        {CATEGORIES.map(cat => {
          const Icon = CATEGORY_ICONS[cat.name]
          const isActive = activeCategory === cat.name
          const isAvailable = available.has(cat.name)
          return (
            <button
              key={cat.name}
              onClick={() => isAvailable && setActiveCategory(cat.name)}
              disabled={!isAvailable}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-150 border-b-2 -mb-px ${
                !isAvailable
                  ? 'border-transparent text-stone-300 cursor-not-allowed'
                  : isActive
                    ? 'border-red-600 text-red-600 cursor-pointer'
                    : 'border-transparent text-stone-400 hover:text-stone-700 hover:border-stone-400 cursor-pointer'
              }`}
            >
              {Icon && <Icon size={12} />}
              {cat.name}
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white border border-stone-200 h-64" />
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-16 border border-stone-200 bg-white">
          <p className="font-[family-name:var(--font-playfair)] text-lg text-stone-700 font-semibold">
            Sin noticias en esta categoría
          </p>
          <p className="text-stone-400 text-sm mt-1">Volvé más tarde, las buenas noticias están en camino.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {news.map(item => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </section>
  )
}
