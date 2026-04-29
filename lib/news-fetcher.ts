import Parser from 'rss-parser'
import type { RawNewsItem } from '@/types'
import { RSS_SOURCES } from './rss-sources'

type FeedItem = {
  title?: string
  contentSnippet?: string
  content?: string
  link?: string
  pubDate?: string
  enclosure?: { url?: string }
  'media:content'?: { $?: { url?: string } }
  'media:thumbnail'?: { $?: { url?: string } }
  itunes?: { image?: string }
}

const parser = new Parser<Record<string, unknown>, FeedItem>({
  customFields: {
    item: [
      ['media:content', 'media:content'],
      ['media:thumbnail', 'media:thumbnail'],
    ],
  },
  timeout: 10000,
})

function extractImageUrl(item: FeedItem): string | null {
  if (item.enclosure?.url && item.enclosure.url.match(/\.(jpg|jpeg|png|webp)/i)) {
    return item.enclosure.url
  }
  if (item['media:content']?.['$']?.url) {
    return item['media:content']['$'].url
  }
  if (item['media:thumbnail']?.['$']?.url) {
    return item['media:thumbnail']['$'].url
  }
  // Try to extract image from content HTML
  if (item.content) {
    const match = item.content.match(/<img[^>]+src=["']([^"']+)["']/i)
    if (match) return match[1]
  }
  return null
}

async function fetchFeed(sourceUrl: string, sourceName: string): Promise<RawNewsItem[]> {
  try {
    const feed = await parser.parseURL(sourceUrl)
    return (feed.items ?? [])
      .filter(item => item.title && item.link)
      .slice(0, 10) // max 10 per feed
      .map(item => ({
        title: (item.title ?? '').trim(),
        description: (item.contentSnippet ?? item.content ?? '').replace(/<[^>]+>/g, '').trim().slice(0, 500),
        link: item.link ?? '',
        pubDate: item.pubDate,
        source: sourceName,
        imageUrl: extractImageUrl(item),
      }))
  } catch {
    // Silently skip failing feeds
    return []
  }
}

export async function fetchAllNews(): Promise<RawNewsItem[]> {
  const results = await Promise.allSettled(
    RSS_SOURCES.map(source => fetchFeed(source.url, source.name))
  )

  const allItems: RawNewsItem[] = []
  const seenLinks = new Set<string>()

  for (const result of results) {
    if (result.status === 'fulfilled') {
      for (const item of result.value) {
        if (item.link && !seenLinks.has(item.link)) {
          seenLinks.add(item.link)
          allItems.push(item)
        }
      }
    }
  }

  return allItems
}
