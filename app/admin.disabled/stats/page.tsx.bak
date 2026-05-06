"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function AdminStats() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [statsId, setStatsId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        projectsCompleted: "",
        happyClients: "",
        teamMembers: "",
        yearsExperience: "",
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
        }
    }

    const fetchStats = async () => {
        try {
            const response = await fetch("/api/stats")
            if (response.ok) {
                const data = await response.json()
                if (data) {
                    setStatsId(data.id)
                    setFormData({
                        projectsCompleted: data.projectsCompleted || "",
                        happyClients: data.happyClients || "",
                        teamMembers: data.teamMembers || "",
                        yearsExperience: data.yearsExperience || "",
                    })
                }
            } else {
                toast.error("Failed to load stats")
            }
        } catch (error: any) {
            toast.error("Unexpected error fetching stats")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const response = await fetch("/api/stats", {
                method: statsId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(statsId ? { ...formData, id: statsId } : formData),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to save stats")
            }

            const data = await response.json()
            if (!statsId && data.id) {
                setStatsId(data.id)
            }
            toast.success("Stats saved successfully")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link href="/admin" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold">Company Statistics</h1>
                    <p className="text-muted-foreground">Manage the numbers shown on the homepage hero section.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="projectsCompleted">Projects Completed</Label>
                                    <Input
                                        id="projectsCompleted"
                                        name="projectsCompleted"
                                        value={formData.projectsCompleted}
                                        onChange={handleChange}
                                        placeholder="e.g. 500+"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="happyClients">Happy Clients</Label>
                                    <Input
                                        id="happyClients"
                                        name="happyClients"
                                        value={formData.happyClients}
                                        onChange={handleChange}
                                        placeholder="e.g. 200+"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="teamMembers">Team Members</Label>
                                    <Input
                                        id="teamMembers"
                                        name="teamMembers"
                                        value={formData.teamMembers}
                                        onChange={handleChange}
                                        placeholder="e.g. 50+"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="yearsExperience">Years Experience</Label>
                                    <Input
                                        id="yearsExperience"
                                        name="yearsExperience"
                                        value={formData.yearsExperience}
                                        onChange={handleChange}
                                        placeholder="e.g. 10+"
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={saving}>
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" /> Save Changes
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
