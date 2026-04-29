'use client'

import { useState, useEffect } from 'react'
import type { News, NewsCategory } from '@/types'
import { CATEGORIES } from '@/types'
import NewsCard from './NewsCard'

interface CategoryFilterProps {
  initialNews: News[]
}

export default function CategoryFilter({ initialNews }: CategoryFilterProps) {
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

  const buttonBase =
    'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap'
  const activeStyle = 'bg-green-600 text-white shadow-sm'
  const inactiveStyle = 'bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-700'

  return (
    <section className="space-y-6">
      {/* Category Buttons */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory('Todas')}
            className={`${buttonBase} ${activeCategory === 'Todas' ? activeStyle : inactiveStyle}`}
          >
            🗞️ Todas
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`${buttonBase} ${activeCategory === cat.name ? activeStyle : inactiveStyle}`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl bg-gray-100 h-64" />
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🌱</p>
          <p className="text-gray-500 font-medium">
            Todavía no hay noticias en esta categoría.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Volvé más tarde, ¡las buenas noticias están en camino!
          </p>
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
