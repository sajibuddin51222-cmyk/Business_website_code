import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { verifyAuth } from "@/lib/backend/auth.service"

const MAX_BYTES = 15 * 1024 * 1024 // 15 MB

const MIME_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
  "image/bmp": ".bmp",
  "image/x-icon": ".ico",
}

export async function POST(request: NextRequest) {
  const user = await verifyAuth()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `File too large (max ${MAX_BYTES / 1024 / 1024} MB)` },
        { status: 400 }
      )
    }

    const mime = file.type || "application/octet-stream"
    if (!mime.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const baseName =
      typeof file.name === "string" && file.name.length > 0 ? file.name : "upload"
    const origExt = path.extname(baseName).toLowerCase()
    const allowedExt = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".gif",
      ".svg",
      ".avif",
      ".bmp",
      ".ico",
    ]
    let ext = MIME_EXT[mime]
    if (!ext && allowedExt.includes(origExt)) ext = origExt
    if (!ext) ext = ".jpg"

    const uniqueFileName = `${crypto.randomUUID()}${ext}`
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })
    const filePath = path.join(uploadDir, uniqueFileName)

    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: `/uploads/${uniqueFileName}`,
      name: baseName,
      size: file.size,
      mime,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
