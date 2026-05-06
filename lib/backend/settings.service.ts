import prisma from "@/lib/db";

export async function getSiteSettings() {
  try {
    let settings = await prisma.siteConfig.findFirst();
    if (!settings) {
      settings = await prisma.siteConfig.create({
        data: { id: "hero" }
      });
    }
    return settings;
  } catch (error) {
    console.warn(
      "Error fetching site settings (using defaults):",
      error instanceof Error ? error.message : error
    );
    return {
      heroTitle: "Transform Your Vision Into Digital Excellence",
      heroBadgeSubtitle: null,
      heroDescription: "We are a full-service digital agency specializing in web development, mobile apps, UI/UX design, and comprehensive digital solutions.",
      heroBgImage: null,
      processTitle: "How We Work",
      processDescription: "We follow a proven Agile methodology to deliver exceptional results with complete transparency"
    };
  }
}
