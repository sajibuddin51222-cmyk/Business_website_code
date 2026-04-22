"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { ImagePicker } from "@/components/admin/image-picker"

export default function HomeSettingsManagement() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        heroTitle: "",
        heroDescription: "",
        heroBgImage: "",
        processTitle: "",
        processDescription: "",
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
            fetchSettings()
        } catch (error) {
            router.push("/admin/login")
        }
    }

    const fetchSettings = async () => {
        try {
            const response = await fetch("/api/settings")
            const data = await response.json()
            if (data) {
                setFormData({
                    heroTitle: data.heroTitle || "",
                    heroDescription: data.heroDescription || "",
                    heroBgImage: data.heroBgImage || "",
                    processTitle: data.processTitle || "",
                    processDescription: data.processDescription || "",
                })
            }
        } catch (error) {
            toast.error("Failed to load settings")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const response = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error("Failed to save settings")

            toast.success("Settings updated successfully")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Home Page Settings</h1>
                        <p className="text-muted-foreground">Manage Hero and Process sections</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Hero Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Hero Title</Label>
                                <Input
                                    value={formData.heroTitle}
                                    onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Hero Description</Label>
                                <Textarea
                                    value={formData.heroDescription}
                                    onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                                    required
                                    rows={4}
                                />
                            </div>
                            <ImagePicker 
                                label="Hero Background Image"
                                value={formData.heroBgImage}
                                onChange={(val) => setFormData({ ...formData, heroBgImage: val })}
                            />
                        </CardContent>
                    </Card>

                    {/* How We Work Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Process Section (How We Work)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Process Title</Label>
                                <Input
                                    value={formData.processTitle}
                                    onChange={(e) => setFormData({ ...formData, processTitle: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Process Description</Label>
                                <Textarea
                                    value={formData.processDescription}
                                    onChange={(e) => setFormData({ ...formData, processDescription: e.target.value })}
                                    required
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" className="w-full" disabled={saving}>
                        {saving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Save All Settings
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}
