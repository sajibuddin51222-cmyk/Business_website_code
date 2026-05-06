import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { verifyAuth } from "@/lib/backend/auth.service"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params
    const data = await req.json()

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        image: data.image,
        bio: data.bio ?? null,
        linkedin: data.linkedin ?? null,
        twitter: data.twitter ?? null,
        github: data.github ?? null,
        order: parseInt(String(data.order), 10) || 0,
        isActive: Boolean(data.isActive),
      },
    })
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params
    await prisma.teamMember.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 })
  }
}
