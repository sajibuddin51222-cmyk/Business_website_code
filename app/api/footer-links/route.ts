import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { verifyAuth } from "@/lib/backend/auth.service"

export async function GET() {
  try {
    const links = await prisma.footerLink.findMany({
      orderBy: [{ column: "asc" }, { order: "asc" }],
    })
    return NextResponse.json(links)
  } catch (error) {
    console.warn("[GET /api/footer-links]", error)
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const data = await req.json()
    const link = await prisma.footerLink.create({
      data: {
        title: data.title,
        url: data.url,
        column: data.column,
        order: parseInt(data.order) || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    })
    return NextResponse.json(link)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create footer link" }, { status: 500 })
  }
}
