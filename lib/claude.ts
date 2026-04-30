import Anthropic from '@anthropic-ai/sdk'
import type { ClaudeAnalysis, NewsCategory, RawNewsItem, SUBCATEGORIES } from '@/types'
import { SUBCATEGORIES as SUBCATS } from '@/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const subcatLines = Object.entries(SUBCATS)
  .map(([cat, subs]) => `- ${cat}: ${(subs as string[]).join(', ')}`)
  .join('\n')

const SYSTEM_PROMPT = `Eres el filtro de "Solo Buenas Noticias", un sitio web argentino de noticias positivas.
Tu tarea es analizar titulares y descripciones de noticias y determinar si son positivas/inspiradoras.

CRITERIOS para noticia POSITIVA (is_positive: true):
- Descubrimientos científicos o médicos
- Logros deportivos y récords
- Avances tecnológicos
- Avances económicos, empresas exitosas, emprendimientos
- Historia y patrimonio cultural
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

CATEGORÍAS disponibles: Historia, Ciencia, Salud, Deportes, Tecnología, Cultura, Internacional, Economía y Finanzas

SUBCATEGORÍAS disponibles por categoría (asigna la más apropiada, o null si no encaja):
${subcatLines}

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
[{"index": 0, "is_positive": true/false, "category": "...", "subcategory": "..." o null, "is_featured": true/false}, ...]

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

export async function filterPositiveNews(
  items: RawNewsItem[]
): Promise<Array<RawNewsItem & { category: NewsCategory; subcategory: string | null; is_featured: boolean }>> {
  const BATCH_SIZE = 20
  const positiveItems: Array<RawNewsItem & { category: NewsCategory; subcategory: string | null; is_featured: boolean }> = []

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE)
    const analyses = await analyzeNewsItems(batch)

    for (const analysis of analyses) {
      if (analysis.is_positive && batch[analysis.index]) {
        positiveItems.push({
          ...batch[analysis.index],
          category: analysis.category as NewsCategory,
          subcategory: analysis.subcategory ?? null,
          is_featured: analysis.is_featured,
        })
      }
    }

    if (i + BATCH_SIZE < items.length) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  return positiveItems
}
