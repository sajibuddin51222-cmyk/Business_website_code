import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { verifyAuth } from "@/lib/backend/auth.service"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params
    const data = await req.json()
    const link = await prisma.footerLink.update({
      where: { id },
      data: {
        title: data.title,
        url: data.url,
        column: data.column,
        order: typeof data.order === "number" ? data.order : parseInt(data.order, 10) || 0,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    })
    return NextResponse.json(link)
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Update failed"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifyAuth()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params
    await prisma.footerLink.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Delete failed"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
