import { getAllNews, getFeaturedNews } from '@/lib/supabase'
import HeroSection from '@/components/HeroSection'
import CategoryFilter from '@/components/CategoryFilter'

export const revalidate = 300

export default async function HomePage() {
  const [featuredNews, allNews] = await Promise.all([
    getFeaturedNews(),
    getAllNews(48),
  ])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <HeroSection featuredNews={featuredNews} />

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-gray-400 text-sm font-medium px-2">Todas las noticias</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <CategoryFilter initialNews={allNews} />
    </main>
  )
}
