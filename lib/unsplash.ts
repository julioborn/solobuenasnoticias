const STOP_WORDS = new Set([
  'de', 'la', 'el', 'los', 'las', 'un', 'una', 'y', 'en', 'que', 'se',
  'del', 'al', 'con', 'por', 'para', 'su', 'es', 'fue', 'son', 'han',
  'más', 'como', 'pero', 'sus', 'le', 'ya', 'o', 'este', 'si', 'sobre',
  'entre', 'cuando', 'muy', 'sin', 'ser', 'hay', 'nos', 'uno',
])

function buildQuery(title: string, category: string): string {
  const words = title
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOP_WORDS.has(w))
    .slice(0, 3)

  // Translate category to English for better Unsplash results
  const categoryMap: Record<string, string> = {
    Historia: 'history',
    Ciencia: 'science',
    Naturaleza: 'nature',
    Salud: 'health',
    Nutrición: 'food nutrition',
    Deportes: 'sports',
    Tecnología: 'technology',
    Cultura: 'culture art',
    Internacional: 'world',
  }

  const catEn = categoryMap[category] ?? category
  return [catEn, ...words].join(' ')
}

export async function getUnsplashImage(title: string, category: string): Promise<string | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) return null

  const query = buildQuery(title, category)

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${key}` } }
    )
    if (!res.ok) {
      console.error(`Unsplash error ${res.status} for query: "${query}"`)
      return null
    }
    const data = await res.json()
    return (data.results?.[0]?.urls?.regular as string) ?? null
  } catch (err) {
    console.error('Unsplash fetch failed:', err)
    return null
  }
}
