"use client"

import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Users, Rocket, Target, RefreshCw, Shield, Headphones } from "lucide-react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/animations"

export function HowWeWork({ settings }: { settings: any }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const process = [
    {
      icon: Users,
      title: "Discovery & Backlog",
      description: "We start by analyzing your requirements and defining a prioritized product backlog for clear visibility.",
    },
    {
      icon: Target,
      title: "Sprint Planning & UI",
      description: "Every sprint starts with a plan. We design the user interface and map out the features for the iteration.",
    },
    {
      icon: Rocket,
      title: "Development Sprints",
      description: "Our team develops in iterative 2-week sprints, providing you with working demos at the end of every cycle.",
    },
    {
      icon: CheckCircle2,
      title: "QA & Continuous Integration",
      description: "We use automated testing and CI/CD pipelines to ensure the highest code quality and zero regressions.",
    },
    {
      icon: RefreshCw,
      title: "Release & Deployment",
      description: "After successful UAT (User Acceptance Testing), we handle the full production release and deployment.",
    },
    {
      icon: Headphones,
      title: "Support & Retro",
      description: "After launch, we provide ongoing support and hold retrospectives to continuously improve the product.",
    },
  ]

  const benefits = [
    "Agile methodology for flexible development",
    "Regular progress updates and demos",
    "Direct communication with development team",
    "Complete project documentation",
    "Source code ownership",
    "1 year free technical support",
    "Free bug fixes and updates",
    "Priority support for maintenance plans",
  ]

  useGSAP(() => {
    // Header reveal
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0, visibility: "visible" },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          }
        }
      )
    }

    // Drawing Dotted Line Animation
    const line = lineRef.current
    if (line) {
      gsap.set(line, { visibility: "visible" })
      gsap.to(line, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-steps-container",
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        }
      })
    }

    // Individual step entrance - Staggered Fade In Up
    const steps = gsap.utils.toArray(".process-step")
    steps.forEach((step: any, index: number) => {
      const content = step.querySelector(".process-card")
      const number = step.querySelector(".process-number")

      if (content && number) {
        gsap.set([content, number], { visibility: "visible" })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          }
        })

        tl.fromTo(content,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "expo.out"
          }
        )
          .fromTo(number,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: "back.out(1.7)"
            },
            "-=0.8"
          )
      }
    })

    // Benefits card reveal
    gsap.fromTo(".benefits-card",
      { y: 80, opacity: 0, visibility: "visible" },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".benefits-card",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="how-we-work" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

      {/* Background Orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[70px]" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[60px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 gsap-reveal">
          <Badge className="mb-6 px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-bold tracking-widest uppercase">
            Our Process
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground text-glow-sm">
            {settings?.processTitle?.includes(' ') ? (
              <>
                {settings.processTitle.split(' ').slice(0, -1).join(' ')}{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {settings.processTitle.split(' ').slice(-1)}
                </span>
              </>
            ) : (
              <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                {settings?.processTitle || "How We Work"}
              </span>
            )}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {settings?.processDescription || "We follow a proven Agile methodology to deliver exceptional results with complete transparency"}
          </p>
        </div>

        {/* Timeline Process Steps */}
        <div className="timeline-steps-container relative max-w-5xl mx-auto mb-20 px-4 md:px-0">
          {/* Central Connecting Lines (Dotted) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block -translate-x-1/2 overflow-hidden">
            {/* Background Dotted Line */}
            <div className="absolute inset-0 border-l-2 border-dashed border-white/10" />
            {/* Drawing Dotted Line */}
            <div ref={lineRef} className="timeline-line-drawing absolute top-0 left-0 w-full h-0 border-l-2 border-dashed border-primary z-10 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] gsap-reveal" />
          </div>

          <div className="space-y-12 md:space-y-16">
            {process.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0
              return (
                <div
                  key={index}
                  className={`process-step flex flex-col md:flex-row items-center gap-12 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content Side */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-20' : 'md:pr-20 md:text-right'}`}>
                    <Card className="process-card p-8 rounded-[40px] bg-card border border-primary/10 hover:border-primary/40 group transition-all duration-500 shadow-2xl relative overflow-hidden">
                      {/* Hover background splash */}
                      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

                      <div className={`flex flex-col ${!isEven ? 'md:items-end' : ''}`}>
                        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xl shadow-primary/30">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black mb-4 text-foreground group-hover:text-primary transition-colors tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Circle Indicator */}
                  <div className="process-number relative z-10 w-16 h-16 rounded-full bg-background border-4 border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] flex items-center justify-center text-primary font-black hidden md:flex text-2xl">
                    {index + 1}
                  </div>

                  {/* Empty Side */}
                  <div className="hidden md:block w-1/2" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Benefits Section with Glassmorphism */}
        <div className="benefits-card">
          <Card className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border-primary/10 p-5 sm:p-6 md:p-14 bg-card overflow-hidden relative shadow-2xl border-2">
            <div className="relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground">
                  What You Get{" "}
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    With Us
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 md:gap-6 group"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/20 transition-all border border-primary/10 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground text-sm sm:text-base group-hover:text-foreground transition-colors duration-300 font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-10 md:mt-14 p-5 sm:p-6 md:p-12 rounded-[20px] sm:rounded-[24px] md:rounded-[32px] bg-primary/5 border border-primary/10 glass-shine relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-10">
                  <CheckCircle2 className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary" />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] bg-primary/20 flex items-center justify-center flex-shrink-0 animate-pulse border border-primary/30">
                    <Headphones className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3 tracking-tight text-foreground">1 Year Free Support Included</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed italic max-w-3xl">
                      Every project comes with one full year of professional technical support and maintenance. We're committed to your long-term success.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background design elements */}
            <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
          </Card>
        </div>
      </div>
    </section>
  )
}

