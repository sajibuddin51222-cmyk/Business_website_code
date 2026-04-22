"use client"

import { useEffect, useState } from "react"
import { Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ContactInfo {
  linkedin?: string
  twitter?: string
  github?: string
}

interface FooterLink {
  id: string
  title: string
  url: string
  column: string
  order: number
  isActive: boolean
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [columns, setColumns] = useState<Record<string, FooterLink[]>>({})

  useEffect(() => {
    // Fetch contact info
    fetch("/api/contact")
      .then(res => res.json())
      .then(data => setContactInfo(data))
      .catch(err => console.error("Error fetching contact info:", err))

    // Fetch footer links
    fetch("/api/footer-links")
      .then(res => res.json())
      .then((data: FooterLink[]) => {
        if (Array.isArray(data)) {
          const activeLinks = data.filter(l => l.isActive)
          const grouped = activeLinks.reduce((acc: Record<string, FooterLink[]>, link) => {
            if (!acc[link.column]) acc[link.column] = []
            acc[link.column].push(link)
            return acc
          }, {})
          setColumns(grouped)
        }
      })
      .catch(err => console.error("Error fetching footer links:", err))
  }, [])

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6p0ES1ACug4DdX4ljJczLTyDQR7Pbt.png"
                alt="FusionBytePro"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FusionBytePro
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Turning ideas into digital reality with innovative solutions and cutting-edge technology.
            </p>
            <div className="flex items-center gap-3">
              {contactInfo?.linkedin && (
                <a href={contactInfo.linkedin} className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-4 h-4 text-primary" />
                </a>
              )}
              {contactInfo?.twitter && (
                <a href={contactInfo.twitter} className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Twitter className="w-4 h-4 text-primary" />
                </a>
              )}
              {contactInfo?.github && (
                <a href={contactInfo.github} className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Github className="w-4 h-4 text-primary" />
                </a>
              )}
              <a href="#" className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Facebook className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>

          {/* Dynamic Columns */}
          {Object.keys(columns).length > 0 ? (
            Object.keys(columns).map((colName) => (
              <div key={colName}>
                <h3 className="font-semibold mb-4 text-foreground">{colName}</h3>
                <ul className="space-y-2">
                  {columns[colName].map((item) => (
                    <li key={item.id}>
                      <Link href={item.url} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            // Fallback if no links in DB
            <>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Services</h3>
                <ul className="space-y-2">
                  {[
                    { label: "Web Development", href: "/#services" },
                    { label: "UI/UX Design", href: "/#services" },
                    { label: "App Development", href: "/#services" },
                    { label: "Digital Marketing", href: "/#services" },
                    { label: "Maintenance", href: "/#services" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                <ul className="space-y-2">
                  {[
                    { label: "About Us", href: "/about-us" },
                    { label: "Our Team", href: "/our-team" },
                    { label: "Careers", href: "/careers" },
                    { label: "Portfolio", href: "/#portfolio" },
                    { label: "Blog", href: "/blog" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Support</h3>
                <ul className="space-y-2">
                  {[
                    { label: "Contact Us", href: "/#contact" },
                    { label: "FAQ", href: "/faq" },
                    { label: "Privacy Policy", href: "/privacy-policy" },
                    { label: "Terms of Service", href: "/terms-of-service" },
                    { label: "Documentation", href: "/documentation" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} FusionBytePro. All rights reserved. Built with passion and innovation.
          </p>
        </div>
      </div>
    </footer>
  )
}
