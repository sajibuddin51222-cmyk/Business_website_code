import { NextRequest, NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Check if directory exists, if not return empty list
    let files: string[] = [];
    try {
      files = await readdir(uploadDir);
    } catch (e) {
      // Directory might not exist yet if no uploads happen
      return NextResponse.json({ images: [] });
    }

    // Filter for common image extensions
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const images = files
      .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
      .map(file => ({
        name: file,
        url: `/uploads/${file}`
      }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error listing images:", error);
    return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
  }
}
