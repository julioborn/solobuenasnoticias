import { NextRequest, NextResponse } from 'next/server'
import { deleteExpiredNews } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

function isAuthorized(request: NextRequest): boolean {
  const secret = request.headers.get('Authorization')
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) return true
  return secret === `Bearer ${cronSecret}`
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const deleted = await deleteExpiredNews()
    console.log(`[cleanup] Deleted ${deleted} expired news items`)
    return NextResponse.json({ success: true, deleted })
  } catch (error) {
    console.error('[cleanup] Error:', error)
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return POST(request)
}
