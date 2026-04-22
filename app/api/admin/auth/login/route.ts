import { NextResponse } from 'next/server'
import { login, logout, verifyAuth } from '@/lib/backend/auth.service'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const result = await login(email, password)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
}
