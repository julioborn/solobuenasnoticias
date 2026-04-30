import { NextRequest, NextResponse } from 'next/server'
import { fetchAllNews } from '@/lib/news-fetcher'
import { filterPositiveNews } from '@/lib/claude'
import { insertNews } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

function isAuthorized(request: NextRequest): boolean {
  const secret = request.headers.get('Authorization')
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) return true // allow in dev
  return secret === `Bearer ${cronSecret}`
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('[fetch-news] Fetching RSS feeds...')
    const rawItems = await fetchAllNews()
    console.log(`[fetch-news] Fetched ${rawItems.length} raw items`)

    console.log('[fetch-news] Filtering with Claude...')
    const positiveItems = await filterPositiveNews(rawItems)
    console.log(`[fetch-news] ${positiveItems.length} positive items found`)

    // Prepare for insertion
    const now = new Date()
    // Expire at midnight of the next day
    const expiry = new Date(now)
    expiry.setDate(expiry.getDate() + 1)
    expiry.setHours(0, 0, 0, 0)

    const toInsert = positiveItems.map(item => ({
      title: item.title,
      description: item.description || null,
      content: null,
      image_url: (item as { imageUrl?: string }).imageUrl || null,
      original_url: item.link,
      source: item.source,
      category: item.category,
      subcategory: item.subcategory,
      is_featured: item.is_featured,
      published_at: item.pubDate ? new Date(item.pubDate).toISOString() : now.toISOString(),
      expires_at: expiry.toISOString(),
    }))

    const inserted = await insertNews(toInsert)
    console.log(`[fetch-news] Inserted ${inserted} new items`)

    return NextResponse.json({
      success: true,
      fetched: rawItems.length,
      positive: positiveItems.length,
      inserted,
    })
  } catch (error) {
    console.error('[fetch-news] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

// Allow GET for manual testing
export async function GET(request: NextRequest) {
  return POST(request)
}
