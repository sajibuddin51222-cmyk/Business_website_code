import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await Promise.resolve(params)
    const data = await req.json()

    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        image: data.image,
        bio: data.bio || null,
        linkedin: data.linkedin || null,
        twitter: data.twitter || null,
        github: data.github || null,
        order: parseInt(data.order) || 0,
        isActive: data.isActive,
      },
    })
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await Promise.resolve(params)
    await prisma.teamMember.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 })
  }
}
