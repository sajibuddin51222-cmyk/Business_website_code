"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/animations"
import Image from "next/image"

export function Hero({ stats, settings }: { stats: any, settings: any }) {
  const displayStats = {
    projectsCompleted: stats?.projectsCompleted || "500+",
    happyClients: stats?.happyClients || "200+",
    teamMembers: stats?.teamMembers || "50+",
    yearsExperience: stats?.yearsExperience || "10+",
  }

  const DEFAULT_BADGE_LINE =
    "Strategy, design, and engineering—partner with us to ship products your users love."

  const rawTitle = settings?.heroTitle || "Transform Your Vision Into Digital Excellence"
  const titleWords = rawTitle.trim().split(/\s+/).filter(Boolean)
  const titleSplitIdx = Math.max(1, Math.ceil(titleWords.length / 2))
  const titleLine1 = titleWords.slice(0, titleSplitIdx).join(" ")
  const titleLine2 = titleWords.slice(titleSplitIdx).join(" ")

  const heroData = {
    title: rawTitle,
    description:
      settings?.heroDescription ||
      "We are a full-service digital agency specializing in web development, mobile apps, UI/UX design, and comprehensive digital solutions.",
    bgImage: settings?.heroBgImage || "/images/hero_bg.png",
    badgeSubtitle:
      typeof settings?.heroBadgeSubtitle === "string" && settings.heroBadgeSubtitle.trim()
        ? settings.heroBadgeSubtitle.trim()
        : DEFAULT_BADGE_LINE,
  }

  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      ".hero-title-line",
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.12,
      }
    )

    gsap.set(".hero-reveal", { visibility: "visible" })

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

    tl.from(".hero-badge", {
      y: 15,
      opacity: 0,
      duration: 0.6,
    })
      .from(
        ".hero-description",
        {
          y: 24,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
        },
        "-=0.25"
      )
      .from(".hero-cta", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.35")
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

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-5xl mx-auto text-center relative z-20">
          {/* Badge */}
          <div className="hero-reveal hero-badge mx-auto flex max-w-3xl flex-col items-center gap-2 px-6 py-4 rounded-3xl bg-primary/15 border border-primary/25 backdrop-blur-sm mb-8 invisible shadow-lg shadow-black/20">
            <div className="flex items-center justify-center gap-2 text-center">
              <Sparkles className="w-5 h-5 shrink-0 text-primary" aria-hidden />
              <span className="text-sm md:text-base font-black uppercase tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]">
                TURNING IDEAS INTO DIGITAL REALITY
              </span>
            </div>
            <p className="text-xs md:text-sm font-medium leading-snug text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)] px-1">
              {heroData.badgeSubtitle}
            </p>
          </div>

          {/* Main heading — no overflow clipping; light text + gradient for dark hero */}
          <h1
            ref={headingRef}
            className="hero-heading mb-10 text-balance font-black tracking-tight leading-[1.08]"
          >
            {titleLine2 ? (
              <>
                <span className="hero-title-line block text-3xl md:text-5xl lg:text-7xl text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.88),0_1px_2px_rgba(0,0,0,0.9)]">
                  {titleLine1}
                </span>
                <span
                  className="hero-title-line mt-2 md:mt-3 block text-3xl md:text-5xl lg:text-7xl bg-gradient-to-r from-[oklch(0.72_0.2_280)] via-purple-400 to-[oklch(0.72_0.18_250)] bg-clip-text text-transparent [filter:drop-shadow(0_3px_28px_rgba(0,0,0,0.85))]"
                  style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {titleLine2}
                </span>
              </>
            ) : (
              <span className="hero-title-line block text-3xl md:text-5xl lg:text-7xl bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent [filter:drop-shadow(0_3px_28px_rgba(0,0,0,0.85))]">
                {titleLine1}
              </span>
            )}
          </h1>

          {/* Main supporting copy (always in DOM for SEO & accessibility; animated in via GSAP) */}
          <p className="hero-reveal hero-description text-lg md:text-2xl text-white mb-14 max-w-4xl mx-auto text-pretty leading-relaxed invisible font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
            {heroData.description}
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
