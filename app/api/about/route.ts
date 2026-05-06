import { NextResponse } from 'next/server'
import { getAllAboutPoints, createAboutPoint, updateAboutPoint, deleteAboutPoint } from '@/lib/backend/about.service'
import { verifyAuth } from '@/lib/backend/auth.service'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('activeOnly') !== 'false'
    const points = await getAllAboutPoints(activeOnly)
    return NextResponse.json(points)
  } catch (err) {
    console.warn('[GET /api/about]', err instanceof Error ? err.message : err)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await request.json()
    const point = await createAboutPoint(data)
    return NextResponse.json(point)
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
    const point = await updateAboutPoint(id, updateData)
    return NextResponse.json(point)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  try {
    await deleteAboutPoint(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
