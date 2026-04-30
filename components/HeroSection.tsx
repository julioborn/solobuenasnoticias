import type { News } from '@/types'
import NewsCard from './NewsCard'

interface HeroSectionProps {
  featuredNews: News[]
}

export default function HeroSection({ featuredNews }: HeroSectionProps) {
  if (featuredNews.length === 0) {
    return (
      <section className="bg-white border border-stone-200 p-10 text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-stone-800 mb-2">
          Las noticias del día están en camino
        </h2>
        <p className="text-stone-500 text-sm">
          Estamos recolectando y filtrando las mejores noticias positivas de Argentina.
          Volvé en unos minutos.
        </p>
      </section>
    )
  }

  const [main, ...rest] = featuredNews

  return (
    <section className="space-y-4">
      {/* section header */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-5 bg-red-600" />
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-500">
          Destacadas del día
        </span>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <NewsCard news={main} featured />
        </div>
        <div className="flex flex-col gap-4">
          {rest.slice(0, 2).map(item => (
            <NewsCard key={item.id} news={item} featured />
          ))}
        </div>
      </div>

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
