import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { verifyAuth } from "@/lib/backend/auth.service"

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(pages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const data = await req.json()
    const page = await prisma.page.create({
      data: {
        slug: data.slug,
        title: data.title,
        content: data.content,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    })
    return NextResponse.json(page)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}
