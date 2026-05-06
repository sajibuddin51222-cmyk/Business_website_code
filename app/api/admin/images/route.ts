import { NextResponse } from "next/server"
import { readdir } from "fs/promises"
import path from "path"
import { verifyAuth } from "@/lib/backend/auth.service"

export async function GET() {
  const user = await verifyAuth()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads")

    let files: string[] = []
    try {
      files = await readdir(uploadDir)
    } catch {
      return NextResponse.json({ images: [] })
    }

    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".svg",
      ".avif",
      ".bmp",
      ".ico",
    ]
    const images = files
      .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
      .map((file) => ({
        name: file,
        url: `/uploads/${file}`,
      }))
      .sort((a, b) => b.name.localeCompare(a.name))

    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error listing images:", error)
    return NextResponse.json({ error: "Failed to list images" }, { status: 500 })
  }
}
