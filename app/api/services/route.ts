import { NextResponse } from 'next/server'
import { getAllServices, createService, updateService, deleteService } from '@/lib/backend/services.service'
import { verifyAuth } from '@/lib/backend/auth.service'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const activeOnly = searchParams.get('activeOnly') !== 'false'
  const services = await getAllServices(activeOnly)
  return NextResponse.json(services)
}

export async function POST(request: Request) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await request.json()
    const service = await createService(data)
    return NextResponse.json(service)
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
    const service = await updateService(id, updateData)
    return NextResponse.json(service)
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
    await deleteService(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
