"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/animations";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Register GSAP plugins only on the client
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.config({
      nullTargetWarn: false,
    });

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initial refresh to handle hydration
    ScrollTrigger.refresh();

    // Delayed refreshes to handle slow-loading cards or images
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 500);
    const longRefreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 2000);

    // Handle internal link scrubbing
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.hash && link.origin === window.location.origin) {
        e.preventDefault();
        lenis.scrollTo(link.hash);
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return <>{children}</>;
}
