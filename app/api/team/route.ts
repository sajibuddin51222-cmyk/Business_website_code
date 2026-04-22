import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const member = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        image: data.image,
        bio: data.bio || null,
        linkedin: data.linkedin || null,
        twitter: data.twitter || null,
        github: data.github || null,
        order: parseInt(data.order) || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    })
    return NextResponse.json(member)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}
