import type { News } from '@/types'
import NewsCard from './NewsCard'

interface HeroSectionProps {
  featuredNews: News[]
}

export default function HeroSection({ featuredNews }: HeroSectionProps) {
  if (featuredNews.length === 0) {
    return (
      <section className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-8 text-center">
        <p className="text-5xl mb-4">🌅</p>
        <h2 className="text-xl font-bold text-green-800 mb-2">Las noticias del día están en camino</h2>
        <p className="text-green-600 text-sm">
          Estamos recolectando y filtrando las mejores noticias positivas de Argentina.
          <br />Volvé en unos minutos.
        </p>
      </section>
    )
  }

  const [main, ...rest] = featuredNews

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-bold px-3 py-1.5 rounded-full">
          ⭐ Destacadas del día
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main featured - bigger */}
        <div className="lg:col-span-2">
          <NewsCard news={main} featured />
        </div>

        {/* Secondary featured */}
        <div className="flex flex-col gap-4">
          {rest.slice(0, 2).map(item => (
            <NewsCard key={item.id} news={item} featured />
          ))}
        </div>
      </div>

      {/* Extra featured if more than 3 */}
      {rest.length > 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.slice(2, 4).map(item => (
            <NewsCard key={item.id} news={item} featured />
          ))}
        </div>
      )}
    </section>
  )
}
