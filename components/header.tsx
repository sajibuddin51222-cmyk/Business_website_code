"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/animations"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useGSAP(() => {
    // Header entrance animation
    gsap.from(".header-content", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    })
  }, [])

  const navItems = [
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "How We Work", href: "/#how-we-work" },
    { label: "Contact", href: "/#contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 header-content">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src="/logo_app_bar.png"
              alt="FusionBytePro Logo"
              width={45}
              height={45}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                {/* Advanced Sliding Underline Effect */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-1/2 transition-all duration-500 ease-expo" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary/30 rounded-full group-hover:w-3/4 transition-all duration-700 ease-expo delay-75" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/start-project">
              <Button className="gradient-primary glow-primary btn-glow group px-8 rounded-xl font-bold">
                <span className="group-hover:tracking-wider transition-all duration-300">Get Started</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2 hover:bg-primary/10 rounded-xl transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu with Glassmorphism */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-6 rounded-[32px] bg-card/60 backdrop-blur-2xl border border-white/5 space-y-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-lg font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/start-project"
                className="pt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="gradient-primary w-full py-7 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20">Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
