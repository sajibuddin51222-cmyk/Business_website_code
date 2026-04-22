import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await Promise.resolve(params);

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

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await Promise.resolve(params);
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

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await Promise.resolve(params);
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
