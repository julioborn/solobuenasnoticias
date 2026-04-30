import { NextResponse } from 'next/server'
import { getAvailableSubcategories } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const subcategories = await getAvailableSubcategories()
  return NextResponse.json(subcategories)
}
