import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Portfolio } from "@/components/portfolio"
import { HowWeWork } from "@/components/how-we-work"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

// Backend Services
import { getAllServices } from "@/lib/backend/services.service"
import { getAllProjects } from "@/lib/backend/projects.service"
import { getCompanyStats } from "@/lib/backend/stats.service"
import { getSiteSettings } from "@/lib/backend/settings.service"

export default async function Home() {
  // Fetch data on the server in parallel for maximum performance
  const [services, projects, stats, settings] = await Promise.all([
    getAllServices(true),
    getAllProjects(),
    getCompanyStats(),
    getSiteSettings()
  ])

  return (
    <main className="min-h-screen">
      <Header />
      <Hero stats={stats} settings={settings} />
      <Services services={services} />
      <About />
      <Portfolio projects={projects} />
      <HowWeWork settings={settings} />
      <Contact />
      <Footer />
    </main>
  )
}
