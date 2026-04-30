import Link from 'next/link'
import Image from 'next/image'
import type { News } from '@/types'
import { CATEGORY_MAP } from '@/types'
import { CATEGORY_ICONS } from '@/lib/categories'

interface NewsCardProps {
  news: News
  featured?: boolean
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' })
}

const FALLBACK_IMAGES: Record<string, string> = {
  Historia: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=600&q=80',
  Ciencia: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80',
  Naturaleza: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
  Salud: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80',
  Nutrición: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
  Deportes: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
  Tecnología: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  Cultura: 'https://images.unsplash.com/photo-1514533212735-5df27d970db0?w=600&q=80',
  Internacional: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const catInfo = CATEGORY_MAP[news.category] ?? { color: 'text-stone-600', textColor: 'text-stone-600' }
  const imageUrl = news.image_url || FALLBACK_IMAGES[news.category] || FALLBACK_IMAGES['Internacional']
  const Icon = CATEGORY_ICONS[news.category]

  if (featured) {
    return (
      <article className="group relative overflow-hidden bg-white border border-stone-200 hover:border-stone-400 transition-colors duration-200 flex flex-col sm:flex-row h-full min-h-[220px]">
        {news.is_featured && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600 z-10" />
        )}
        {/* stretched link */}
        <Link href={`/noticias/${news.id}`} className="absolute inset-0 z-0" aria-label={news.title} />

        <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden flex-shrink-0">
          <Image
            src={imageUrl}
            alt={news.title}
            fill
            className="object-cover blur-[2px] group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, 40vw"
            unoptimized
          />
        </div>
        <div className="flex flex-col justify-between p-5 flex-1 border-l border-stone-200 relative">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              {Icon && <Icon size={11} className={catInfo.color} />}
              <span className={`text-[10px] font-bold uppercase tracking-widest ${catInfo.color}`}>
                {news.category}
              </span>
              {news.is_featured && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 border-l border-stone-300 pl-2 ml-0.5">
                  Destacada
                </span>
              )}
            </div>
            <h2 className="font-bold text-stone-900 text-xl leading-snug line-clamp-none mb-2 group-hover:text-red-700 transition-colors duration-200">
              {news.title}
            </h2>
            {news.description && (
              <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">{news.description}</p>
            )}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
            <div className="flex items-center gap-2 text-[11px] text-stone-400 uppercase tracking-wider">
              <span className="font-semibold">{news.source}</span>
              <span>·</span>
              <span>{formatDate(news.published_at)}</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={news.original_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 text-[10px] text-stone-400 hover:text-stone-600 transition-colors uppercase tracking-wider"
              >
                Original ↗
              </a>
              <span className="text-xs font-semibold text-red-600 group-hover:text-red-700 transition-colors uppercase tracking-wider">
                Leer →
              </span>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group relative overflow-hidden bg-white border border-stone-200 hover:border-stone-400 transition-colors duration-200 flex flex-col h-full">
      {/* stretched link */}
      <Link href={`/noticias/${news.id}`} className="absolute inset-0 z-0" aria-label={news.title} />

      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={news.title}
          fill
          className="object-cover blur-[2px] group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>

      <div className="flex flex-col flex-1 p-4 border-t-2 border-stone-950 relative">
        <div className="flex items-center gap-1.5 mb-2">
          {Icon && <Icon size={10} className={catInfo.color} />}
          <span className={`text-[9px] font-bold uppercase tracking-widest ${catInfo.color}`}>
            {news.category}
          </span>
          {news.is_featured && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-red-600 border-l border-stone-300 pl-1.5 ml-0.5">
              Dest.
            </span>
          )}
        </div>

        <h3 className="font-bold text-stone-900 leading-snug line-clamp-none mb-2 group-hover:text-red-700 transition-colors duration-200">
          {news.title}
        </h3>
        {news.description && (
          <p className="text-stone-500 text-xs line-clamp-2 mb-3 leading-relaxed">{news.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-stone-100">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider">{news.source}</span>
          <div className="flex items-center gap-3">
            <a
              href={news.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 text-[10px] text-stone-400 hover:text-stone-600 transition-colors uppercase tracking-wider"
            >
              Original ↗
            </a>
            <span className="text-[10px] font-bold text-red-600 group-hover:text-red-700 transition-colors uppercase tracking-wider">
              Leer →
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
