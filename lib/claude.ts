import Anthropic from '@anthropic-ai/sdk'
import type { ClaudeAnalysis, NewsCategory, RawNewsItem } from '@/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `Eres el filtro de "Solo Buenas Noticias", un sitio web argentino de noticias positivas.
Tu tarea es analizar titulares y descripciones de noticias y determinar si son positivas/inspiradoras.

CRITERIOS para noticia POSITIVA (is_positive: true):
- Descubrimientos científicos o médicos
- Logros deportivos y récords
- Avances tecnológicos
- Iniciativas comunitarias y solidaridad
- Conservación de la naturaleza
- Historia y patrimonio cultural
- Gastronomía, nutrición y bienestar
- Arte, música, literatura, cine
- Historias de superación personal
- Noticias internacionales inspiradoras

CRITERIOS para noticia NEGATIVA (is_positive: false) — EXCLUIR:
- Accidentes, muertes, tragedias
- Crímenes, violencia, inseguridad
- Crisis económica, inflación, pobreza
- Conflictos políticos o escándalos
- Desastres naturales (a menos que sea la respuesta solidaria)
- Guerras o conflictos internacionales
- Enfermedades en tono alarmista

CATEGORÍAS disponibles: Historia, Ciencia, Naturaleza, Salud, Nutrición, Deportes, Tecnología, Cultura, Internacional

is_featured: true solo para noticias extraordinarias (máximo 1-2 por lote).

Responde ÚNICAMENTE con un array JSON válido, sin texto adicional.`

export async function analyzeNewsItems(
  items: Pick<RawNewsItem, 'title' | 'description'>[]
): Promise<ClaudeAnalysis[]> {
  if (items.length === 0) return []

  const itemsText = items
    .map(
      (item, i) =>
        `[${i}] Título: ${item.title}\nDescripción: ${item.description || '(sin descripción)'}`
    )
    .join('\n\n')

  const prompt = `Analiza estas ${items.length} noticias y devuelve un JSON array:
[{"index": 0, "is_positive": true/false, "category": "...", "is_featured": true/false}, ...]

Noticias:
${itemsText}`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    // Extract JSON array from response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) return []

    const parsed = JSON.parse(jsonMatch[0]) as ClaudeAnalysis[]
    return parsed.filter(
      item =>
        typeof item.index === 'number' &&
        typeof item.is_positive === 'boolean' &&
        typeof item.category === 'string' &&
        typeof item.is_featured === 'boolean'
    )
  } catch (err) {
    console.error('Claude analysis error:', err)
    return []
  }
}

// Process in batches of 20 to avoid token limits
export async function filterPositiveNews(
  items: RawNewsItem[]
): Promise<Array<RawNewsItem & { category: NewsCategory; is_featured: boolean }>> {
  const BATCH_SIZE = 20
  const positiveItems: Array<RawNewsItem & { category: NewsCategory; is_featured: boolean }> = []

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE)
    const analyses = await analyzeNewsItems(batch)

    for (const analysis of analyses) {
      if (analysis.is_positive && batch[analysis.index]) {
        positiveItems.push({
          ...batch[analysis.index],
          category: analysis.category as NewsCategory,
          is_featured: analysis.is_featured,
        })
      }
    }

    // Small delay between batches to respect rate limits
    if (i + BATCH_SIZE < items.length) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  return positiveItems
}
