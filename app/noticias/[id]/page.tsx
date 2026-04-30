import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getNewsById } from '@/lib/supabase'
import { CATEGORY_MAP } from '@/types'
import { CATEGORY_ICONS } from '@/lib/categories'

interface Props {
  params: Promise<{ id: string }>
}

export default async function NoticiaPage({ params }: Props) {
  const { id } = await params
  const news = await getNewsById(id)

  if (!news) notFound()

  const catInfo = CATEGORY_MAP[news.category] ?? { color: 'text-stone-600' }
  const Icon = CATEGORY_ICONS[news.category]
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
        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-stone-400 hover:text-red-600 mb-8 group transition-colors"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
        Volver al inicio
      </Link>

      <article className="bg-white border border-stone-200">
        {/* red accent bar for featured */}
        {news.is_featured && <div className="h-[3px] bg-red-600" />}

        {imageUrl && (
          <div className="relative h-64 sm:h-80 w-full border-b border-stone-200">
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

        <div className="p-6 sm:p-10 space-y-5">
          {/* category + meta */}
          <div className="flex items-center gap-2 pb-4 border-b border-stone-200">
            {Icon && <Icon size={12} className={catInfo.color} />}
            <span className={`text-[10px] font-bold uppercase tracking-widest ${catInfo.color}`}>
              {news.category}
            </span>
            {news.is_featured && (
              <>
                <span className="text-stone-300">·</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">
                  Destacada
                </span>
              </>
            )}
            <span className="text-stone-300 ml-auto">·</span>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">{news.source}</span>
            <span className="text-stone-300">·</span>
            <span className="text-[10px] uppercase tracking-wider text-stone-400">{formattedDate}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-stone-950 leading-tight">
            {news.title}
          </h1>

          {news.description && (
            <p className="text-stone-600 text-base leading-relaxed border-l-2 border-stone-300 pl-4 ">
              {news.description}
            </p>
          )}

          {news.content && (
            <div className="prose max-w-none text-stone-700 text-base leading-relaxed">
              {news.content}
            </div>
          )}

          <div className="pt-5 border-t-2 border-stone-950">
            <a
              href={news.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer inline-flex items-center gap-2 bg-stone-950 hover:bg-red-700 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 transition-colors duration-200"
            >
              Leer nota completa en {news.source} ↗
            </a>
          </div>
        </div>
      </article>
    </main>
  )
}
