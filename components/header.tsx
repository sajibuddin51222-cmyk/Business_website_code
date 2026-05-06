"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/animations"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const primaryNav = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "How We Work", href: "/#how-we-work" },
]

const companyLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Our Team", href: "/our-team" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
]

const supportLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Documentation", href: "/documentation" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useGSAP(() => {
    gsap.from(".header-content", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    })
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 header-content">
        <div className="flex items-center justify-between h-12 gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src="/logo_app_bar.png"
              alt="FusionBytePro Logo"
              width={45}
              height={45}
              className="object-contain"
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-1 flex-wrap justify-end">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors relative group",
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                )}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-1/2 transition-all duration-500 ease-expo" />
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors",
                    isScrolled
                      ? "text-foreground hover:text-primary"
                      : "text-white hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                  )}
                >
                  Company
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[12rem]">
                {companyLinks.map((l) => (
                  <DropdownMenuItem key={l.href} asChild>
                    <Link href={l.href}>{l.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors",
                    isScrolled
                      ? "text-foreground hover:text-primary"
                      : "text-white hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                  )}
                >
                  Legal & help
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[12rem]">
                {supportLinks.map((l) => (
                  <DropdownMenuItem key={l.href} asChild>
                    <Link href={l.href}>{l.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/#contact">Contact</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden xl:block shrink-0">
            <Link href="/start-project">
              <Button className="gradient-primary glow-primary btn-glow group px-6 rounded-xl font-bold text-sm">
                <span className="group-hover:tracking-wider transition-all duration-300">Get Started</span>
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className={cn(
              "xl:hidden p-2 hover:bg-white/10 rounded-xl transition-all duration-300",
              isScrolled ? "text-foreground" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div
          className={`xl:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-[900px] mt-6 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6 rounded-[32px] bg-card/60 backdrop-blur-2xl border border-white/5 space-y-6">
            <nav className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-lg font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Company
              </p>
              {companyLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 py-3 text-lg font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Legal & help
              </p>
              {supportLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 py-3 text-lg font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="px-4 py-3 text-lg font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link href="/start-project" className="pt-4" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="gradient-primary w-full py-7 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
