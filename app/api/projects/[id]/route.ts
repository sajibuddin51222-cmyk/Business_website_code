import { NextResponse } from 'next/server'
import { getProjectById, deleteProject } from '@/lib/backend/projects.service'
import { verifyAuth } from '@/lib/backend/auth.service'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(project)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  try {
    await deleteProject(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
