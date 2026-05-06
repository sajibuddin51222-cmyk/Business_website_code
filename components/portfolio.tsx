"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getIcon } from "@/lib/icons"
import { Loader2, ArrowUpRight } from "lucide-react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/animations"
import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"
import { parseJsonResponse } from "@/lib/utils"

function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="rounded-[32px] p-2 bg-card/20 animate-pulse border-white/5">
          <div className="p-6">
            <div className="w-full h-56 bg-white/5 rounded-2xl mb-8" />
            <div className="h-8 bg-white/5 rounded-lg mb-4 w-3/4" />
            <div className="h-4 bg-white/5 rounded-lg mb-2 w-full" />
            <div className="h-4 bg-white/5 rounded-lg mb-6 w-full" />
            <div className="flex gap-2">
              <div className="h-5 bg-white/5 rounded-xl w-16" />
              <div className="h-5 bg-white/5 rounded-xl w-16" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export function Portfolio() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const data = await parseJsonResponse<unknown[]>(response, [])
      setProjects(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
    setLoading(false)
  }

  useGSAP(() => {
    // Floating background elements
    gsap.to(".bg-floating", {
      y: "random(-40, 40)",
      x: "random(-25, 25)",
      duration: "random(6, 12)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.6
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="portfolio" className="pt-8 pb-24 relative overflow-hidden bg-background">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Floating elements - Reduced blur */}
      <div className="bg-floating absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[60px]" />
      <div className="bg-floating absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[70px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <Badge className="mb-6 px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-bold tracking-widest uppercase">
            Our Masterpieces
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our diverse portfolio of successful transformations across industries
          </p>
        </ScrollReveal>

        {/* Projects Grid or Skeleton */}
        {loading ? (
          <PortfolioSkeleton />
        ) : (
          <ScrollReveal animation="fade-up" stagger={0.15} className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const Icon = getIcon(project.icon)
              return (
                <Link href={`/portfolio/${project.id}`} key={project.id} className="reveal-item block group">
                  <Card
                    className="relative overflow-hidden bg-card border border-primary/10 hover:border-primary/40 transition-colors duration-700 h-full rounded-[32px] p-2 shadow-2xl"
                  >
                    <div className="bg-background rounded-[28px] overflow-hidden p-6 h-full flex flex-col">
                      {/* Project Visual with Premium Glide */}
                      <div className="relative w-full h-56 mb-8 overflow-hidden rounded-2xl">
                        <Image
                          src={project.image || "/images/portfolio_1.png"}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                        
                        {/* Floating Link Arrow */}
                        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-2xl">
                          <ArrowUpRight className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                      </div>

                      <div className="px-2">
                        {/* Category & Badge */}
                        <div className="flex items-center gap-4 mb-5">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-500`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">{project.category}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300 tracking-tight">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 line-clamp-3 transition-colors duration-300">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-auto pb-4">
                          {project.tags && project.tags.slice(0, 3).map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="px-3 py-1 text-[10px] uppercase font-black border-primary/20 bg-primary/5 text-primary/70 tracking-tighter"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* High-end Inner Glow on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </Card>
                </Link>
              )
            })}
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
