import Link from 'next/link'
import Image from 'next/image'
import type { News } from '@/types'
import { CATEGORY_MAP } from '@/types'

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
  Comunidad: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
  Internacional: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  const catInfo = CATEGORY_MAP[news.category] ?? { emoji: '📰', color: 'bg-gray-100 text-gray-700' }
  const imageUrl = news.image_url || FALLBACK_IMAGES[news.category] || FALLBACK_IMAGES['Comunidad']

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row h-full min-h-[220px]">
        <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden flex-shrink-0">
          <Image
            src={imageUrl}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 40vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {news.is_featured && (
            <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              ⭐ Destacada
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between p-5 flex-1">
          <div>
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${catInfo.color}`}>
              {catInfo.emoji} {news.category}
            </span>
            <h2 className="font-bold text-gray-900 text-lg leading-snug line-clamp-3 mb-2 group-hover:text-green-700 transition-colors">
              {news.title}
            </h2>
            {news.description && (
              <p className="text-gray-500 text-sm line-clamp-2">{news.description}</p>
            )}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-medium text-gray-500">{news.source}</span>
              <span>·</span>
              <span>{formatDate(news.published_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/noticias/${news.id}`}
                className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                Ver más →
              </Link>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-100">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={imageUrl}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <span className={`absolute top-2 left-2 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${catInfo.color}`}>
          {catInfo.emoji} {news.category}
        </span>
        {news.is_featured && (
          <span className="absolute top-2 right-2 text-sm">⭐</span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-gray-900 leading-snug line-clamp-3 mb-2 group-hover:text-green-700 transition-colors text-sm">
          {news.title}
        </h3>
        {news.description && (
          <p className="text-gray-500 text-xs line-clamp-2 mb-3">{news.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-400">{news.source}</span>
          <div className="flex items-center gap-3">
            <a
              href={news.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Original ↗
            </a>
            <Link
              href={`/noticias/${news.id}`}
              className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              Ver más →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
