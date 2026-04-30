export type NewsCategory =
  | 'Historia'
  | 'Ciencia'
  | 'Naturaleza'
  | 'Salud'
  | 'Nutrición'
  | 'Deportes'
  | 'Tecnología'
  | 'Cultura'
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

export const CATEGORIES: { name: NewsCategory; emoji: string; color: string; textColor: string }[] = [
  { name: 'Historia',      emoji: '', color: 'text-amber-700',   textColor: 'text-amber-700' },
  { name: 'Ciencia',       emoji: '', color: 'text-blue-700',    textColor: 'text-blue-700' },
  { name: 'Naturaleza',    emoji: '', color: 'text-emerald-700', textColor: 'text-emerald-700' },
  { name: 'Salud',         emoji: '', color: 'text-green-700',   textColor: 'text-green-700' },
  { name: 'Nutrición',     emoji: '', color: 'text-lime-700',    textColor: 'text-lime-700' },
  { name: 'Deportes',      emoji: '', color: 'text-orange-700',  textColor: 'text-orange-700' },
  { name: 'Tecnología',    emoji: '', color: 'text-violet-700',  textColor: 'text-violet-700' },
  { name: 'Cultura',       emoji: '', color: 'text-pink-700',    textColor: 'text-pink-700' },
  { name: 'Internacional', emoji: '', color: 'text-sky-700',     textColor: 'text-sky-700' },
]

export const CATEGORY_MAP: Record<NewsCategory, { emoji: string; color: string; textColor: string }> =
  Object.fromEntries(CATEGORIES.map(c => [c.name, { emoji: c.emoji, color: c.color, textColor: c.textColor }])) as Record<NewsCategory, { emoji: string; color: string; textColor: string }>
