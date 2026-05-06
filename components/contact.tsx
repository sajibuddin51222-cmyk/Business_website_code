"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Loader2, Send } from "lucide-react"
import { toast } from "sonner"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/animations"

import { parseJsonResponse } from "@/lib/utils"
import { DEFAULT_CONTACT_INFO } from "@/lib/public-defaults"

export function Contact() {
  const [contactInfo, setContactInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const response = await fetch("/api/contact")
      const data = await parseJsonResponse(response, { ...DEFAULT_CONTACT_INFO })
      setContactInfo(data)
    } catch (error) {
      console.error("Error fetching contact info:", error)
      setContactInfo({ ...DEFAULT_CONTACT_INFO })
    }
    setLoading(false)
  }

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(".bg-orb", {
        y: "random(-36, 36)",
        x: "random(-36, 36)",
        duration: "random(6, 11)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.45,
      })
    })

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".bg-orb", { clearProps: "transform" })
      gsap.set(
        [
          ".contact-header",
          ".contact-card",
          ".contact-form-shell",
          ".contact-field",
          ".contact-submit-wrap",
        ],
        { opacity: 1, visibility: "visible", clearProps: "transform" }
      )
    })

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".contact-header",
        { y: 40, opacity: 0, visibility: "visible" },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-header",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        ".contact-card",
        { x: -52, opacity: 0, visibility: "visible" },
        {
          x: 0,
          opacity: 1,
          duration: 0.68,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info-stack",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        ".contact-form-shell",
        { x: 48, opacity: 0, visibility: "visible" },
        {
          x: 0,
          opacity: 1,
          duration: 0.78,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form-shell",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        ".contact-field",
        { y: 32, opacity: 0, visibility: "visible" },
        {
          y: 0,
          opacity: 1,
          duration: 0.52,
          stagger: 0.085,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-form-inner",
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        ".contact-submit-wrap",
        { y: 24, opacity: 0, visibility: "visible" },
        {
          y: 0,
          opacity: 1,
          duration: 0.58,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-submit-wrap",
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      )
    })

    return () => mm.revert()
  }, { scope: containerRef })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          description: formData.message,
          projectType: "General Inquiry",
          budget: "N/A",
          timeline: "N/A",
          services: [],
        }),
      })

      if (!response.ok) throw new Error("Failed to submit request")

      toast.success("Message sent successfully! We'll get back to you soon.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactCards = [
    {
      icon: Mail,
      title: "Email Us",
      value: contactInfo?.email || "info@fusionbytepro.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: contactInfo?.phone || "+1 (555) 123-4567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: contactInfo?.address || "123 Tech Street, Digital City",
    },
  ]

  return (
    <section ref={containerRef} id="contact" className="py-24 relative overflow-hidden bg-background">
      {/* Background effects - Reduced blur */}
      <div className="bg-orb absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[60px]" />
      <div className="bg-orb absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[70px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="contact-header gsap-reveal text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              Get In{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to start your project? Contact us today and let&apos;s create something amazing together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="contact-info-stack space-y-6">
              {contactCards.map((card) => (
                <Card
                  key={card.title}
                  className="contact-card gsap-reveal rounded-[32px] border border-primary/10 p-8 bg-card/95 backdrop-blur-sm hover:border-primary/45 group transition-all duration-500 shadow-xl hover:shadow-[0_24px_50px_-12px_rgba(104,107,253,0.2)] hover:-translate-y-1.5"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all duration-500 shadow-lg shadow-primary/10">
                      <card.icon className="w-7 h-7 text-primary group-hover:text-white transition-all duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors duration-300">
                        {card.title}
                      </h3>
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                          {card.value}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Premium Contact Form */}
            <Card className="contact-form-shell gsap-reveal lg:col-span-2 rounded-[48px] border-primary/10 p-10 md:p-16 bg-card/95 backdrop-blur-sm shadow-2xl relative overflow-hidden ring-1 ring-primary/5">
                <form onSubmit={handleSubmit} className="contact-form-inner space-y-12 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Name Field */}
                    <div className="contact-field relative group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder=" "
                        className="peer w-full rounded-t-md bg-transparent border-b-2 border-border/80 py-4 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 text-lg"
                      />
                      <label 
                        htmlFor="name"
                        className="absolute left-0 top-3 text-muted-foreground/60 text-lg transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:text-primary peer-focus:text-sm font-bold peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:text-sm"
                      >
                        Your Name
                      </label>
                    </div>

                    {/* Email Field */}
                    <div className="contact-field relative group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder=" "
                        className="peer w-full rounded-t-md bg-transparent border-b-2 border-border/80 py-4 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 text-lg"
                      />
                      <label 
                        htmlFor="email"
                        className="absolute left-0 top-3 text-muted-foreground/60 text-lg transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:text-primary peer-focus:text-sm font-bold peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="contact-field relative group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full rounded-t-md bg-transparent border-b-2 border-border/80 py-4 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 text-lg"
                    />
                    <label 
                      htmlFor="phone"
                      className="absolute left-0 top-4 text-muted-foreground text-lg transition-all duration-300 pointer-events-none peer-focus:-translate-y-9 peer-focus:text-primary peer-focus:text-sm font-bold peer-[:not(:placeholder-shown)]:-translate-y-9 peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:text-sm"
                    >
                      Phone Number
                    </label>
                  </div>

                  {/* Message Field */}
                  <div className="contact-field relative group">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder=" "
                      className="peer w-full rounded-t-md bg-transparent border-b-2 border-border/80 py-4 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 resize-none text-lg"
                    />
                    <label 
                      htmlFor="message"
                      className="absolute left-0 top-4 text-muted-foreground text-lg transition-all duration-300 pointer-events-none peer-focus:-translate-y-9 peer-focus:text-primary peer-focus:text-sm font-bold peer-[:not(:placeholder-shown)]:-translate-y-9 peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:text-sm"
                    >
                      Your Message
                    </label>
                  </div>

                  <div className="contact-submit-wrap">
                    <Button
                      type="submit"
                      className="w-full gradient-primary glow-primary text-xl h-20 rounded-2xl group transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/25"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                      ) : (
                        <span className="flex items-center justify-center gap-3 font-black tracking-tight">
                          SEND MESSAGE
                          <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-500" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>

                {/* Decorative background Radial */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
              </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
