"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, CheckCircle2, Sparkles, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function StartProject() {
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    services: [] as string[],
    budget: "",
    timeline: "",
    description: "",
    hasDesign: false,
    needsHosting: false,
    needsPlayStore: false,
    needsAppStore: false,
  })

  const serviceOptions = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "AI Integration",
    "E-commerce Solution",
    "Security Implementation",
    "Marketing & SEO",
    "Webflow Design",
    "Google Play Console Setup",
    "Apple Developer Account Setup",
  ]

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to submit request")

      // Send email notification
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            message: formData.description,
          }),
        })
      } catch (emailError) {
        console.error("Error sending email:", emailError)
      }

      toast.success("Thank you! We'll contact you within 24 hours to discuss your project.")

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        services: [],
        budget: "",
        timeline: "",
        description: "",
        hasDesign: false,
        needsHosting: false,
        needsPlayStore: false,
        needsAppStore: false,
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("There was an error submitting your request. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <Badge className="mb-4 gradient-primary text-primary-foreground">
                <Sparkles className="w-4 h-4 mr-2" />
                Start Your Project
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Let's Build Something <span className="gradient-animated bg-clip-text text-transparent">Amazing</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                Fill out the form below and our team will get back to you within 24 hours with a detailed proposal
              </p>
            </div>

            {/* Form */}
            <Card className="gradient-card border-primary/20 p-8 md:p-12 animate-fade-in-up">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your Company"
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Project Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web Application</SelectItem>
                          <SelectItem value="mobile">Mobile Application</SelectItem>
                          <SelectItem value="both">Web + Mobile</SelectItem>
                          <SelectItem value="design">UI/UX Design Only</SelectItem>
                          <SelectItem value="ai">AI Solution</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range *</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k+">$100,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="timeline">Expected Timeline *</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">ASAP (1-2 weeks)</SelectItem>
                          <SelectItem value="1month">1 Month</SelectItem>
                          <SelectItem value="2-3months">2-3 Months</SelectItem>
                          <SelectItem value="3-6months">3-6 Months</SelectItem>
                          <SelectItem value="6months+">6+ Months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Services Needed */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Services Needed *
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceOptions.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                        />
                        <Label htmlFor={service} className="cursor-pointer font-normal">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Requirements */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Additional Requirements
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasDesign"
                        checked={formData.hasDesign}
                        onCheckedChange={(checked) => setFormData({ ...formData, hasDesign: checked as boolean })}
                      />
                      <Label htmlFor="hasDesign" className="cursor-pointer font-normal">
                        I already have design files (Figma, Sketch, etc.)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsHosting"
                        checked={formData.needsHosting}
                        onCheckedChange={(checked) => setFormData({ ...formData, needsHosting: checked as boolean })}
                      />
                      <Label htmlFor="needsHosting" className="cursor-pointer font-normal">
                        I need hosting and domain setup
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsPlayStore"
                        checked={formData.needsPlayStore}
                        onCheckedChange={(checked) => setFormData({ ...formData, needsPlayStore: checked as boolean })}
                      />
                      <Label htmlFor="needsPlayStore" className="cursor-pointer font-normal">
                        I need Google Play Console account setup
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="needsAppStore"
                        checked={formData.needsAppStore}
                        onCheckedChange={(checked) => setFormData({ ...formData, needsAppStore: checked as boolean })}
                      />
                      <Label htmlFor="needsAppStore" className="cursor-pointer font-normal">
                        I need Apple Developer account setup
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Project Description *
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="description">Tell us about your project</Label>
                    <Textarea
                      id="description"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your project goals, target audience, key features, and any specific requirements..."
                      className="min-h-[150px] bg-background/50"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button type="submit" size="lg" className="w-full gradient-primary glow-primary text-lg group" disabled={submitting}>
                    {submitting ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</>
                    ) : (
                        <>Submit Project Request<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    We'll review your request and get back to you within 24 hours
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
