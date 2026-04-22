import { NextResponse } from 'next/server'
import { getCompanyStats, updateCompanyStats, createCompanyStats } from '@/lib/backend/stats.service'
import { verifyAuth } from '@/lib/backend/auth.service'

export async function GET() {
  const stats = await getCompanyStats()
  return NextResponse.json(stats)
}

export async function POST(request: Request) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await request.json()
    const stats = await createCompanyStats(data)
    return NextResponse.json(stats)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await request.json()
    const { id, ...updateData } = data
    const stats = await updateCompanyStats(id, updateData)
    return NextResponse.json(stats)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
