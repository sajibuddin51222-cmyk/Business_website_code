import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { verifyAuth } from "@/lib/backend/auth.service"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get("all") === "true"
    if (all) {
      const user = await verifyAuth()
      if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      const members = await prisma.teamMember.findMany({
        orderBy: { order: "asc" },
      })
      return NextResponse.json(members)
    }
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
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

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
