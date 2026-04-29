export type NewsCategory =
  | 'Historia'
  | 'Ciencia'
  | 'Naturaleza'
  | 'Salud'
  | 'Nutrición'
  | 'Deportes'
  | 'Tecnología'
  | 'Cultura'
  | 'Comunidad'
  | 'Internacional'

export interface News {
  id: string
  title: string
  description: string | null
  content: string | null
  image_url: string | null
  original_url: string
  source: string
  category: NewsCategory
  is_featured: boolean
  published_at: string
  created_at: string
  expires_at: string
}

export interface RawNewsItem {
  title: string
  description: string
  link: string
  pubDate?: string
  enclosure?: { url: string }
  'media:content'?: { $: { url: string } }
  'media:thumbnail'?: { $: { url: string } }
  source: string
}

export interface ClaudeAnalysis {
  index: number
  is_positive: boolean
  category: NewsCategory
  is_featured: boolean
}

export const CATEGORIES: { name: NewsCategory; emoji: string; color: string }[] = [
  { name: 'Historia', emoji: '🏛️', color: 'bg-amber-100 text-amber-800 hover:bg-amber-200' },
  { name: 'Ciencia', emoji: '🔬', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
  { name: 'Naturaleza', emoji: '🌿', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
  { name: 'Salud', emoji: '💚', color: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' },
  { name: 'Nutrición', emoji: '🥗', color: 'bg-lime-100 text-lime-800 hover:bg-lime-200' },
  { name: 'Deportes', emoji: '⚽', color: 'bg-orange-100 text-orange-800 hover:bg-orange-200' },
  { name: 'Tecnología', emoji: '💡', color: 'bg-violet-100 text-violet-800 hover:bg-violet-200' },
  { name: 'Cultura', emoji: '🎭', color: 'bg-pink-100 text-pink-800 hover:bg-pink-200' },
  { name: 'Comunidad', emoji: '🤝', color: 'bg-teal-100 text-teal-800 hover:bg-teal-200' },
  { name: 'Internacional', emoji: '🌍', color: 'bg-sky-100 text-sky-800 hover:bg-sky-200' },
]

export const CATEGORY_MAP: Record<NewsCategory, { emoji: string; color: string }> =
  Object.fromEntries(CATEGORIES.map(c => [c.name, { emoji: c.emoji, color: c.color }])) as Record<NewsCategory, { emoji: string; color: string }>
