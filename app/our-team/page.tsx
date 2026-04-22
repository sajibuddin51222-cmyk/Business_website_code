import prisma from "@/lib/db"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"

export const metadata = {
  title: "Our Team - FusionBytePro",
  description: "Meet the talented team behind FusionBytePro - developers, designers, and strategists building the future."
}

export default async function OurTeamPage() {
  const members = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" }
  })

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="pt-36 pb-24 relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[70px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <TeamSection members={members} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
