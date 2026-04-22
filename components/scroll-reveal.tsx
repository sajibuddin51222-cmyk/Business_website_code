"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/animations"

interface ScrollRevealProps {
  children: React.ReactNode
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in" | "scale-up"
  delay?: number
  duration?: number
  distance?: number
  className?: string
  stagger?: number
  triggerOnce?: boolean
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = "",
  stagger = 0,
  triggerOnce = false
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!elementRef.current) return

    const el = elementRef.current
    
    const configFrom: gsap.TweenVars = {
      opacity: 0,
      visibility: "visible",
    }

    const configTo: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse",
      }
    }

    // Apply specific animation logic
    switch (animation) {
      case "fade-up":
        gsap.fromTo(el, { ...configFrom, y: distance }, configTo)
        break
      case "fade-in":
        gsap.fromTo(el, configFrom, configTo)
        break
      case "slide-left":
        gsap.fromTo(el, { ...configFrom, x: -distance }, configTo)
        break
      case "slide-right":
        gsap.fromTo(el, { ...configFrom, x: distance }, configTo)
        break
      case "zoom-in":
        gsap.fromTo(el, { ...configFrom, scale: 0.8 }, configTo)
        break
      case "scale-up":
        gsap.fromTo(el, { ...configFrom, scale: 0.5 }, configTo)
        break
    }

    // Handle staggering if children have a specific class
    if (stagger > 0) {
      const targets = el.querySelectorAll(".reveal-item")
      if (targets.length > 0) {
        gsap.fromTo(targets, 
          { y: distance, opacity: 0, visibility: "visible" },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse",
            }
          }
        )
      }
    }
  }, { scope: elementRef })

  return (
    <div ref={elementRef} className={`gsap-reveal ${className}`}>
      {children}
    </div>
  )
}
