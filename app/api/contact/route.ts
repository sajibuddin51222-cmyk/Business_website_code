import { NextResponse } from 'next/server'
import { getContactInfo, updateContactInfo, createContactInfo } from '@/lib/backend/contact.service'
import { verifyAuth } from '@/lib/backend/auth.service'

export async function GET() {
  const info = await getContactInfo()
  return NextResponse.json(info)
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
