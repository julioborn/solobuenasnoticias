import { NextRequest, NextResponse } from 'next/server'
import { getAllNews, getFeaturedNews, getNewsByCategory } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const subcategory = searchParams.get('subcategory') ?? undefined
  const featured = searchParams.get('featured')
  const limit = parseInt(searchParams.get('limit') ?? '30', 10)

  try {
    if (featured === 'true') {
      const news = await getFeaturedNews()
      return NextResponse.json({ news })
    }

    if (category) {
      const news = await getNewsByCategory(category, limit, subcategory)
      return NextResponse.json({ news })
    }

    const news = await getAllNews(limit)
    return NextResponse.json({ news })
  } catch (error) {
    console.error('API /api/news error:', error)
    return NextResponse.json({ error: 'Error fetching news' }, { status: 500 })
  }
}
