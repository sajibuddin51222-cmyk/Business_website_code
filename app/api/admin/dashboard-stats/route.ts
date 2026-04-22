import { NextResponse } from 'next/server'
import { getAdminDashboardStats } from '@/lib/backend/stats.service'
import { verifyAuth } from '@/lib/backend/auth.service'

export async function GET() {
  const user = await verifyAuth()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stats = await getAdminDashboardStats()
  return NextResponse.json(stats)
}
