import { NextResponse } from 'next/server'
import { getContactInfo, updateContactInfo, createContactInfo } from '@/lib/backend/contact.service'
import { verifyAuth } from '@/lib/backend/auth.service'
import { DEFAULT_CONTACT_INFO } from '@/lib/public-defaults'

export async function GET() {
  try {
    const info = await getContactInfo()
    if (info) return NextResponse.json(info)
    return NextResponse.json({ ...DEFAULT_CONTACT_INFO })
  } catch (err) {
    console.warn('[GET /api/contact]', err instanceof Error ? err.message : err)
    return NextResponse.json({ ...DEFAULT_CONTACT_INFO })
  }
}

export async function POST(request: Request) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await request.json()
    const info = await createContactInfo(data)
    return NextResponse.json(info)
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
    const info = await updateContactInfo(id, updateData)
    return NextResponse.json(info)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
