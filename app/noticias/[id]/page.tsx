import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getNewsById } from '@/lib/supabase'
import { CATEGORY_MAP } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function NoticiaPage({ params }: Props) {
  const { id } = await params
  const news = await getNewsById(id)

  if (!news) notFound()

  const catInfo = CATEGORY_MAP[news.category] ?? { emoji: '📰', color: 'bg-gray-100 text-gray-700' }
  const imageUrl = news.image_url

  const formattedDate = new Date(news.published_at).toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-green-600 hover:text-green-700 font-medium mb-6 group"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
        Volver al inicio
      </Link>

      <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {imageUrl && (
          <div className="relative h-64 sm:h-80 w-full">
            <Image
              src={imageUrl}
              alt={news.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full ${catInfo.color}`}>
              {catInfo.emoji} {news.category}
            </span>
            {news.is_featured && (
              <span className="inline-flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                ⭐ Destacada
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
            {news.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="font-medium text-gray-500">{news.source}</span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>

          {news.description && (
            <p className="text-gray-600 text-base leading-relaxed border-l-4 border-green-200 pl-4 italic">
              {news.description}
            </p>
          )}

          {news.content && (
            <div className="prose prose-green max-w-none text-gray-700 text-base leading-relaxed">
              {news.content}
            </div>
          )}

          <div className="pt-4 border-t border-gray-100">
            <a
              href={news.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Leer nota completa en {news.source}
              <span>↗</span>
            </a>
          </div>
        </div>
      </article>
    </main>
  )
}
