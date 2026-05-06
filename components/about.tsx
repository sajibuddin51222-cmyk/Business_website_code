"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getIcon } from "@/lib/icons"
import { Loader2, ArrowRight } from "lucide-react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/animations"
import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"
import { parseJsonResponse } from "@/lib/utils"

export function About() {
  const [points, setPoints] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchAboutPoints()
  }, [])

  const fetchAboutPoints = async () => {
    try {
      const response = await fetch("/api/about")
      const data = await parseJsonResponse<unknown[]>(response, [])
      setPoints(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching about points:", error)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <section id="about" className="pt-0 pb-12 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </section>
    )
  }

  return (
    <section ref={containerRef} id="about" className="pt-0 pb-4 relative overflow-hidden bg-background">
      {/* Dynamic Background Orbs - Reduced blur for clarity */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[60px]" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[70px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                FusionBytePro
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We combine technical expertise with creative innovation to deliver exceptional digital experiences
            </p>
          </ScrollReveal>

          {/* Points Grid */}
          <ScrollReveal animation="fade-up" stagger={0.12} className="points-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {points.map((point) => {
              const Icon = getIcon(point.icon)
              return (
                <Card
                  key={point.id}
                  className="reveal-item gradient-card border-primary/10 p-8 hover:border-primary/50 group bg-card transition-colors duration-500 rounded-3xl"
                >
                  <div className="flex items-start gap-6">
                    {/* Icon or Image with Premium Hover Effect */}
                    <div className={`w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-primary/5 overflow-hidden ${!point.image ? 'group-hover:bg-primary' : 'border border-primary/10'}`}>
                      {point.image ? (
                        <div className="relative w-8 h-8">
                          <Image src={point.image} alt={point.title} fill className="object-contain" />
                        </div>
                      ) : (
                        <Icon className="w-8 h-8 text-primary group-hover:text-white transition-all duration-300" />
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                        {point.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base group-hover:text-foreground/80 transition-colors duration-300">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </ScrollReveal>
        </div>

        {/* Premium CTA Card — Full Width */}
        <ScrollReveal animation="scale-up" duration={0.7} className="cta-card mt-10">
          <Card
            className="gradient-card border-primary/20 py-16 px-6 sm:py-20 sm:px-12 md:py-28 md:px-16 lg:py-36 lg:px-24 text-center glow-primary relative overflow-hidden bg-card rounded-[24px] sm:rounded-[32px] md:rounded-[40px] shadow-2xl"
          >
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 md:mb-8 text-foreground tracking-tight">
                Ready to Transform Your <br className="hidden md:block" /> Digital Presence?
              </h3>
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                Let's discuss how we can help you achieve your business goals with innovative digital solutions
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link href="#contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto px-8 py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 rounded-xl sm:rounded-2xl gradient-primary text-white font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-primary/40 group text-sm sm:text-base">
                    Get in Touch
                    <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Decorative radial background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}
