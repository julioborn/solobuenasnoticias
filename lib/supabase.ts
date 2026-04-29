import { createClient } from '@supabase/supabase-js'
import type { News } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with elevated permissions for write operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function getFeaturedNews(): Promise<News[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Error fetching featured news:', error)
    return []
  }
  return data ?? []
}

export async function getNewsByCategory(category: string, limit = 12): Promise<News[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching news by category:', error)
    return []
  }
  return data ?? []
}

export async function getAllNews(limit = 30): Promise<News[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching all news:', error)
    return []
  }
  return data ?? []
}

export async function getNewsById(id: string): Promise<News | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function insertNews(
  items: Omit<News, 'id' | 'created_at' | 'expires_at'>[]
): Promise<number> {
  if (items.length === 0) return 0

  const { data, error } = await supabaseAdmin
    .from('news')
    .upsert(items, { onConflict: 'original_url', ignoreDuplicates: true })
    .select('id')

  if (error) {
    console.error('Error inserting news:', error)
    return 0
  }
  return data?.length ?? 0
}

export async function deleteExpiredNews(): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from('news')
    .delete()
    .lt('expires_at', new Date().toISOString())
    .select('id')

  if (error) {
    console.error('Error deleting expired news:', error)
    return 0
  }
  return data?.length ?? 0
}
