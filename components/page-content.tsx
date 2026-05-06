"use client"

import DOMPurify from "isomorphic-dompurify"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/animations"
import { ScrollReveal } from "./scroll-reveal"

export function PageContent({ page }: { page: { title: string; content: string } }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Stagger the decorative elements
    gsap.from(".page-decoration", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out"
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative">
      {/* Decorative background orbs */}
      <div className="page-decoration absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="page-decoration absolute bottom-1/3 left-0 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[70px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Breadcrumb & Title */}
        <ScrollReveal animation="fade-up" distance={30}>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span>/</span>
            <span className="text-foreground font-medium">{page.title}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-foreground">
            {page.title}
          </h1>
          
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-purple-500 rounded-full mb-12" />
        </ScrollReveal>

        {/* Content */}
        <ScrollReveal animation="fade-up" delay={0.2} distance={40}>
          <div 
            className="page-body prose prose-invert prose-lg max-w-none
              [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-foreground [&>h2]:tracking-tight
              [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-bold [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:text-foreground
              [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4 [&>p]:text-base [&>p]:md:text-lg
              [&>p>strong]:text-foreground [&>p>strong]:font-semibold
              [&>p>a]:text-primary [&>p>a]:underline [&>p>a]:underline-offset-4 hover:[&>p>a]:text-primary/80
              [&>p>em]:text-muted-foreground/70"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(page.content, {
                ADD_TAGS: ["iframe"],
                ADD_ATTR: ["allow", "allowfullscreen", "target", "rel"],
              }),
            }}
          />
        </ScrollReveal>
      </div>
    </div>
  )
}
