"use client"

import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/animations"
import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"

function ServiceSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="rounded-3xl p-1 bg-card/20 animate-pulse border-white/5">
          <div className="p-6">
            <div className="w-full h-56 bg-white/5 rounded-2xl mb-6" />
            <div className="h-8 bg-white/5 rounded-lg mb-4 w-3/4" />
            <div className="h-4 bg-white/5 rounded-lg mb-2 w-full" />
            <div className="h-4 bg-white/5 rounded-lg mb-6 w-full" />
            <div className="space-y-2">
              <div className="h-3 bg-white/5 rounded-lg w-1/2" />
              <div className="h-3 bg-white/5 rounded-lg w-1/2" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export function Services({ services }: { services: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Floating background elements - Reduced range
    gsap.to(".bg-floating", {
      y: "random(-15, 15)",
      x: "random(-10, 10)",
      duration: "random(6, 10)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    })
  }, { scope: containerRef })

  const getServiceImage = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes("web")) return "/images/service_web.png"
    if (t.includes("mobile") || t.includes("app")) return "/images/service_mobile.png"
    if (t.includes("ui") || t.includes("ux") || t.includes("design")) return "/images/service_ui.png"
    if (t.includes("ai") || t.includes("intelligence")) return "/images/service_ai.png"
    return "/images/portfolio_1.png"
  }

  return (
    <section ref={containerRef} id="services" className="py-24 relative overflow-hidden bg-background">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Floating background elements - Reduced blur and opacity */}
      <div className="bg-floating absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[60px]" />
      <div className="bg-floating absolute bottom-20 left-10 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[70px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty font-medium">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <ScrollReveal animation="fade-up" stagger={0.15} className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service) => (
            <Card
              key={service.id}
              className="reveal-item relative group overflow-hidden bg-card border border-primary/10 hover:border-primary/50 transition-colors duration-500 rounded-3xl p-1 shadow-xl h-full"
            >
              <div className="bg-background rounded-[22px] overflow-hidden p-6 h-full flex flex-col">
                {/* Service Visual with Hover Zoom */}
                <div className="relative w-full h-52 mb-6 overflow-hidden rounded-2xl transition-all duration-700">
                  <Image
                    src={service.image || getServiceImage(service.title)}
                    alt={service.title}
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3 text-sm md:text-base font-medium">
                    {service.description}
                  </p>

                  {/* Features List with Staggered Hover Effect */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-3">
                      {service.features.slice(0, 3).map((feature: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-sm text-muted-foreground/80 font-medium"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Glow Effect on Hover */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-primary/0 via-primary/20 to-purple-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm pointer-events-none -z-10" />
              </div>
            </Card>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
