import { notFound } from "next/navigation"
import prisma from "@/lib/db"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageContent } from "@/components/page-content"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } })
  
  if (!page) return { title: "Not Found - FusionBytePro" }
  
  return {
    title: `${page.title} - FusionBytePro`,
    description: `${page.title} page of FusionBytePro digital agency.`
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const page = await prisma.page.findUnique({
    where: { slug }
  })

  if (!page || !page.isActive) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <PageContent page={{ title: page.title, content: page.content }} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
