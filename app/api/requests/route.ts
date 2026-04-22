import { NextResponse } from 'next/server'
import { getAllProjectRequests, createProjectRequest, updateProjectRequestStatus } from '@/lib/backend/contact.service'
import { verifyAuth } from '@/lib/backend/auth.service'

export async function GET() {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const requests = await getAllProjectRequests()
  return NextResponse.json(requests)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const result = await createProjectRequest(data)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await request.json()
    const { id, status } = data
    const result = await updateProjectRequestStatus(id, status)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
