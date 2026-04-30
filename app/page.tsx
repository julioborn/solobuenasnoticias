import { Suspense } from 'react'
import { getAllNews, getFeaturedNews, getAvailableCategories } from '@/lib/supabase'
import HeroSection from '@/components/HeroSection'
import CategoryFilter from '@/components/CategoryFilter'

export const revalidate = 300

export default async function HomePage() {
  const [featuredNews, allNews, availableCategories] = await Promise.all([
    getFeaturedNews(),
    getAllNews(48),
    getAvailableCategories(),
  ])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <HeroSection featuredNews={featuredNews} />

      <div className="flex items-center gap-3">
        <div className="w-2 h-5 bg-stone-950" />
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-500">
          Todas las noticias
        </span>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white border border-stone-200 h-72" />
          ))}
        </div>
      }>
        <CategoryFilter initialNews={allNews} availableCategories={availableCategories} />
      </Suspense>
    </main>
  )
}
