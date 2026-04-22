"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

export default function PlansPage() {
    const plans = [
        {
            name: "Starter",
            price: "$999",
            description: "Perfect for small businesses and startups looking to establish a digital presence.",
            features: [
                "Custom Website Design",
                "Mobile Responsive",
                "Basic SEO Optimization",
                "Contact Form Integration",
                "1 Month Support",
            ],
            popular: false,
        },
        {
            name: "Professional",
            price: "$2,499",
            description: "Ideal for growing businesses needing a robust and scalable solution.",
            features: [
                "Everything in Starter",
                "CMS Integration",
                "Advanced SEO Package",
                "Performance Optimization",
                "Social Media Integration",
                "3 Months Support",
            ],
            popular: true,
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Tailored solutions for large organizations with complex requirements.",
            features: [
                "Everything in Professional",
                "Custom Web Application",
                "E-commerce Functionality",
                "API Integrations",
                "Priority Support",
                "Dedicated Project Manager",
            ],
            popular: false,
        },
    ]

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-20 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full  animate-pulse pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full  animate-pulse delay-1000 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-primary">PRICING PLANS</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Choose the Perfect Plan for Your <span className="text-primary">Business</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Transparent pricing with no hidden fees. Select the package that best fits your needs and let's start building your digital success.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <div
                                key={plan.name}
                                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg ${plan.popular
                                    ? "border-primary bg-background/50 backdrop-blur-sm shadow-md scale-105 z-10"
                                    : "border-border bg-background/30 hover:border-primary/50"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <div className="text-4xl font-bold text-primary mb-4">{plan.price}</div>
                                    <p className="text-muted-foreground">{plan.description}</p>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/start-project" className="block">
                                    <Button
                                        className={`w-full ${plan.popular ? "gradient-primary glow-primary" : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"}`}
                                        variant={plan.popular ? "default" : "outline"}
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
