"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, FolderKanban, Mail, Briefcase, Info, Phone, BarChart, Loader2, Users } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function AdminDashboard() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        projects: 0,
        requests: 0,
        services: 0,
        aboutPoints: 0,
        pages: 0,
        footerLinks: 0,
        teamMembers: 0,
    })

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const response = await fetch("/api/admin/auth/me")
            if (!response.ok) {
                router.push("/admin/login")
                return
            }
            fetchStats()
        } catch (error) {
            router.push("/admin/login")
        } finally {
            setLoading(false)
        }
    }

    const fetchStats = async () => {
        try {
            const response = await fetch("/api/admin/dashboard-stats")
            if (response.ok) {
                const data = await response.json()
                setStats(data)
            }
        } catch (error) {
            console.error("Error fetching stats:", error)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/auth/logout", { method: "POST" })
            toast.success("Logged out successfully")
            router.push("/admin/login")
        } catch (error) {
            toast.error("Logout failed")
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    const sections = [
        {
            title: "Projects",
            description: "Manage portfolio projects",
            icon: FolderKanban,
            href: "/admin/projects",
            count: stats.projects,
            color: "from-blue-500 to-cyan-500",
        },
        {
            title: "Project Requests",
            description: "View and manage form submissions",
            icon: Mail,
            href: "/admin/requests",
            count: stats.requests,
            color: "from-purple-500 to-pink-500",
        },
        {
            title: "Services",
            description: "Manage services offered",
            icon: Briefcase,
            href: "/admin/services",
            count: stats.services,
            color: "from-green-500 to-teal-500",
        },
        {
            title: "Team Members",
            description: "Manage team for /our-team",
            icon: Users,
            href: "/admin/team",
            count: stats.teamMembers,
            color: "from-blue-600 to-indigo-600",
        },
        {
            title: "CMS Pages",
            description: "Manage dynamic footer pages",
            icon: Info,
            href: "/admin/pages",
            count: stats.pages,
            color: "from-amber-500 to-orange-600",
        },
        {
            title: "Footer Links",
            description: "Manage footer navigation",
            icon: Info,
            href: "/admin/footer",
            count: stats.footerLinks,
            color: "from-slate-600 to-slate-900",
        },
        {
            title: "About Section",
            description: "Manage 'Why Choose Us' points",
            icon: Info,
            href: "/admin/about",
            count: stats.aboutPoints,
            color: "from-orange-500 to-red-500",
        },
        {
            title: "Contact Info",
            description: "Update contact information",
            icon: Phone,
            href: "/admin/contact",
            count: 1,
            color: "from-indigo-500 to-purple-500",
        },
        {
            title: "Company Stats",
            description: "Update homepage numbers",
            icon: BarChart,
            href: "/admin/stats",
            count: 1,
            color: "from-yellow-500 to-orange-500",
        },
    ]

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage your website content</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map((section) => {
                        const Icon = section.icon
                        return (
                            <Card key={section.title} className="p-6 hover:shadow-lg transition-shadow">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                                <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold">{section.count}</span>
                                    <Link href={section.href}>
                                        <Button size="sm">
                                            Manage
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
