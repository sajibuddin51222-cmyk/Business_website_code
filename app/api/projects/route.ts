import { NextResponse } from 'next/server'
import { getAllProjects, createProject, updateProject, deleteProject } from '@/lib/backend/projects.service'
import { verifyAuth } from '@/lib/backend/auth.service'

export async function GET() {
  const projects = await getAllProjects()
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const data = await request.json()
    const project = await createProject(data)
    return NextResponse.json(project)
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
    const project = await updateProject(id, updateData)
    return NextResponse.json(project)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
