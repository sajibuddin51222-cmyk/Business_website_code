"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/animations"
import Image from "next/image"

export function Hero({ stats, settings }: { stats: any, settings: any }) {
  const displayStats = {
    projectsCompleted: stats?.projectsCompleted || "500+",
    happyClients: stats?.happyClients || "200+",
    teamMembers: stats?.teamMembers || "50+",
    yearsExperience: stats?.yearsExperience || "10+",
  }

  const heroData = {
    title: settings?.heroTitle || "Transform Your Vision Into Digital Excellence",
    description: settings?.heroDescription || "We are a full-service digital agency specializing in web development, mobile apps, UI/UX design, and comprehensive digital solutions.",
    bgImage: settings?.heroBgImage || "/images/hero_bg.png"
  }

  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Mask Reveal for Title
    gsap.to(".hero-title-mask", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.2
    })

    // Typing Animation for Description
    const descriptionText = heroData.description
    const descEl = document.querySelector(".hero-description")
    if (descEl) {
      descEl.textContent = ""
      // Simple custom typing logic without plugin
      let ctx = { val: 0 };
      gsap.to(ctx, {
        val: descriptionText.length,
        duration: 1.5,
        ease: "none",
        delay: 0.5,
        onUpdate: () => {
          descEl.textContent = descriptionText.substring(0, Math.ceil(ctx.val));
        }
      })
    }

    // Set initial invisibility to prevent flicker, then reveal
    gsap.set(".hero-reveal", { visibility: "visible" })

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

    tl.from(".hero-badge", {
      y: 15,
      opacity: 0,
      duration: 0.6,
    })
      .from(".hero-cta", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "+=0.5") // Wait for typing
      .from(".stat-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        onComplete: () => {
          // Animate numbers after entrance
          gsap.to(".stat-number", {
            innerText: (i, target) => target.dataset.target,
            duration: 1.5,
            snap: { innerText: 1 },
            ease: "power2.inOut",
          })
        }
      }, "-=0.3")

    // Parallax Effect for Background
    gsap.to(bgRef.current, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

    // Parallax for Heading
    gsap.to(".hero-title-mask", {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

    // Magnetic effect for button
    if (buttonRef.current) {
      const btn = buttonRef.current
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        })
      })
    }

    // Floating background elements
    gsap.to(".bg-floating", {
      y: "random(-20, 20)",
      x: "random(-15, 15)",
      duration: "random(5, 8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.4
    })
  }, { scope: heroRef })

  return (
    <section ref={heroRef} id="home" className="relative flex flex-col justify-center overflow-hidden pt-36 pb-12">
      {/* Background with Parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src={heroData.bgImage}
          alt="Abstract Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        {/* Subtle geometric overlay placeholder */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        {/* Removed heavy top gradient, kept subtle bottom blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </div>

      {/* Animated Floating Orbs - Reduced blur and opacity for clarity */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="bg-floating absolute top-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-primary/10 rounded-full blur-[60px] animate-pulse" />
        <div className="bg-floating absolute bottom-[15%] right-[5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-purple-500/5 rounded-full blur-[70px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-reveal hero-badge inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6 invisible">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm md:text-base font-bold text-foreground">TURNING IDEAS INTO DIGITAL REALITY</span>
          </div>

          {/* Main heading with Mask Reveal */}
          <h1 ref={headingRef} className="text-3xl md:text-5xl lg:text-7xl font-black mb-10 text-balance leading-[1.05] tracking-tight">
            {heroData.title.split(' ').length > 4 ? (
              <>
                <div className="text-mask">
                  <span className="hero-title-mask inline-block text-foreground translate-y-[110%] opacity-0">
                   {heroData.title.split(' ').slice(0, 3).join(' ')}
                  </span>
                </div>
                <br />
                <div className="text-mask">
                  <span className="hero-title-mask inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-500 translate-y-[90%] opacity-0">
                    {heroData.title.split(' ').slice(3).join(' ')}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-mask">
                <span className="hero-title-mask inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-500 translate-y-[90%] opacity-0">
                  {heroData.title}
                </span>
              </div>
            )}
          </h1>

          {/* Subheading with Typing Animation */}
          <p className="hero-reveal hero-description text-lg md:text-2xl text-white/90 mb-14 max-w-4xl mx-auto text-pretty leading-relaxed invisible font-semibold typing-cursor min-h-[3em]">
            {/* Animates via GSAP transition */}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <div ref={buttonRef} className="hero-reveal hero-cta invisible">
              <Link href="/start-project">
                <Button size="lg" className="gradient-primary glow-primary text-lg h-16 px-10 group btn-glow rounded-2xl">
                  Start Your Project
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Section with Glassmorphism */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mt-12 p-8 rounded-3xl bg-card/10 backdrop-blur-md border border-white/5"
          >
            {[
              { label: "Projects Completed", value: displayStats.projectsCompleted },
              { label: "Happy Clients", value: displayStats.happyClients },
              { label: "Team Members", value: displayStats.teamMembers },
              { label: "Years Experience", value: displayStats.yearsExperience },
            ].map((stat) => {
              const numValue = parseInt(stat.value) || 0
              const suffix = stat.value.toString().replace(/[0-9]/g, "")

              return (
                <div
                  key={stat.label}
                  className="hero-reveal stat-item text-center invisible"
                >
                  <div className="text-3xl md:text-5xl font-black text-primary mb-2 flex items-center justify-center tracking-tighter">
                    <span className="stat-number" data-target={numValue}>0</span>
                    {suffix}
                  </div>
                  <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modern Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
    </section>
  )
}
