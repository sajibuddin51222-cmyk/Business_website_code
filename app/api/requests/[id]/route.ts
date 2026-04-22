import { NextResponse } from 'next/server'
import { getProjectRequestById } from '@/lib/backend/contact.service'
import { verifyAuth } from '@/lib/backend/auth.service'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const req = await getProjectRequestById(id)
  if (!req) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  
  return NextResponse.json(req)
}
