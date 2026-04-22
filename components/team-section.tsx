"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/animations"
import { Linkedin, Twitter, Github } from "lucide-react"
import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"

interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio?: string
  linkedin?: string
  twitter?: string
  github?: string
}

export function TeamSection({ members }: { members: TeamMember[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Reveal logic handled by ScrollReveal component
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      {/* Header */}
      <ScrollReveal className="team-title text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-4">
          Our{" "}
          <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Team
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore Our Success Stories and Innovative Projects
        </p>
      </ScrollReveal>

      {/* Team Grid - Phitron Pill Style */}
      {members.length > 0 ? (
        <ScrollReveal animation="fade-up" stagger={0.08} className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto">
          {members.map((member, index) => {
            // Vary heights for visual interest like phitron
            const heights = ["h-[320px]", "h-[360px]", "h-[400px]", "h-[340px]", "h-[380px]"]
            const height = heights[index % heights.length]
            // Slight offset for odd items
            const offset = index % 2 === 1 ? "mt-8" : "mt-0"

            return (
              <div
                key={member.id}
                className={`reveal-item group relative w-[160px] md:w-[180px] ${height} ${offset} rounded-[80px] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105`}
              >
                {/* Photo */}
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay - Shows on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Info - Visible on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-white font-bold text-sm mb-0.5 drop-shadow-lg">{member.name}</h3>
                  <p className="text-white/80 text-xs font-medium mb-2">{member.role}</p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-2">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors">
                        <Linkedin className="w-3.5 h-3.5 text-white" />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors">
                        <Twitter className="w-3.5 h-3.5 text-white" />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors">
                        <Github className="w-3.5 h-3.5 text-white" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Subtle bottom bar always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center group-hover:opacity-0 transition-opacity duration-300">
                  <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 inline-block">
                    <p className="text-white text-xs font-semibold truncate">{member.name}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollReveal>
      ) : (
        <div className="text-center p-16 text-muted-foreground rounded-3xl bg-card border border-border">
          <p className="text-lg">Team members will be displayed here.</p>
          <p className="text-sm mt-2">Add team members from the admin panel at <code className="text-primary">/admin/team</code></p>
        </div>
      )}
    </div>
  )
}
