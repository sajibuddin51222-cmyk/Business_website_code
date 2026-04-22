import { NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/backend/auth.service'

export async function GET() {
  const user = await verifyAuth()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ user })
}
