import { NextResponse } from 'next/server'
import { logout } from '@/lib/backend/auth.service'

export async function POST() {
  await logout()
  return NextResponse.json({ success: true })
}
