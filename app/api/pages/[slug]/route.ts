import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { verifyAuth } from "@/lib/backend/auth.service"

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const page = await prisma.page.findUnique({
      where: { slug },
    })

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { slug } = await params;
    const data = await req.json()

    const existing = await prisma.page.findUnique({ where: { slug } });
    if (!existing) return NextResponse.json({ error: "Page not found" }, { status: 404 });

    const page = await prisma.page.update({
      where: { id: existing.id },
      data: {
        title: data.title,
        content: data.content,
        isActive: data.isActive,
      },
    })
    return NextResponse.json(page)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { slug } = await params;
    const existing = await prisma.page.findUnique({ where: { slug } });
    if (!existing) return NextResponse.json({ error: "Page not found" }, { status: 404 });

    await prisma.page.delete({
      where: { id: existing.id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}
