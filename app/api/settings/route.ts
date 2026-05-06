import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyAuth } from "@/lib/backend/auth.service";

export async function GET() {
  try {
    let settings = await prisma.siteConfig.findFirst();
    
    if (!settings) {
      // Create default settings if they don't exist
      settings = await prisma.siteConfig.create({
        data: { id: "hero" }
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Settings fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const user = await verifyAuth();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();
    
    // We only have one settings record with id "hero"
    const settings = await prisma.siteConfig.upsert({
      where: { id: "hero" },
      update: data,
      create: { ...data, id: "hero" }
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
