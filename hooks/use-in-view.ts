"use client"

import { useEffect, useRef, useState } from "react"
import { ANIMATION_CONFIG } from "@/lib/animation-config"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { threshold = ANIMATION_CONFIG.THRESHOLDS.CARDS, rootMargin = "0px", triggerOnce = true } = options
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(true) // Start as true to ensure visibility

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Always visible immediately on mount
    setIsInView(true)

    if (!triggerOnce) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        { threshold, rootMargin }
      )

      observer.observe(element)

      return () => {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isInView }
}

/**
 * Calculate staggered animation delay based on index
 * @param index - Element index
 * @param baseDelay - Base delay in seconds (defaults to ANIMATION_CONFIG.STAGGER.BASE)
 * @returns CSS delay string in format "0.1s"
 */
export function getStaggerDelay(index: number, baseDelay: number = ANIMATION_CONFIG.STAGGER.BASE): string {
  return `${index * baseDelay}s`
}
