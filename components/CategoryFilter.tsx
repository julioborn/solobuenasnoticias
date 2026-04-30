'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { News, NewsCategory } from '@/types'
import { CATEGORIES } from '@/types'
import { CATEGORY_ICONS } from '@/lib/categories'
import NewsCard from './NewsCard'

interface CategoryFilterProps {
  initialNews: News[]
  availableCategories: string[]
}

export default function CategoryFilter({ initialNews, availableCategories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'Todas'
  const activeSubcategory = searchParams.get('subcategory')

  const available = new Set(availableCategories)
  const [news, setNews] = useState<News[]>(initialNews)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchNews() {
      if (activeCategory === 'Todas' && !activeSubcategory) {
        setNews(initialNews)
        return
      }
      setLoading(true)
      try {
        const params = new URLSearchParams({ limit: '48' })
        if (activeCategory !== 'Todas') params.set('category', activeCategory)
        if (activeSubcategory) params.set('subcategory', activeSubcategory)
        const res = await fetch(`/api/news?${params}`)
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
    fetchNews()
  }, [activeCategory, activeSubcategory, initialNews])

  function setCategory(cat: string) {
    if (cat === 'Todas') {
      router.push('/')
    } else {
      router.push(`/?category=${encodeURIComponent(cat)}`)
    }
  }

  const AllIcon = CATEGORY_ICONS['Todas']

  return (
    <section className="space-y-6">
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide border-b border-stone-200">
        <button
          onClick={() => setCategory('Todas')}
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
              onClick={() => isAvailable && setCategory(cat.name)}
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

      {/* subcategory breadcrumb */}
      {activeSubcategory && (
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-500">
          <span
            className="cursor-pointer hover:text-stone-800 transition-colors"
            onClick={() => router.push(`/?category=${encodeURIComponent(activeCategory)}`)}
          >
            {activeCategory}
          </span>
          <span className="text-stone-300">›</span>
          <span className="font-bold text-red-600">{activeSubcategory}</span>
          <button
            onClick={() => router.push(`/?category=${encodeURIComponent(activeCategory)}`)}
            className="cursor-pointer ml-1 text-stone-400 hover:text-stone-700 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white border border-stone-200 h-72" />
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-16 border border-stone-200 bg-white">
          <p className="font-[family-name:var(--font-playfair)] text-lg text-stone-700 font-semibold">
            Sin noticias en esta sección
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
