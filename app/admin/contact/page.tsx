"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function ContactManagement() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [contactId, setContactId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        twitter: "",
        github: "",
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
            fetchContact()
        } catch (error) {
            router.push("/admin/login")
        } finally {
            setLoading(false)
        }
    }

    const fetchContact = async () => {
        try {
            const response = await fetch("/api/contact")
            if (response.ok) {
                const data = await response.json()
                if (data) {
                    setContactId(data.id)
                    setFormData({
                        email: data.email || "",
                        phone: data.phone || "",
                        address: data.address || "",
                        linkedin: data.linkedin || "",
                        twitter: data.twitter || "",
                        github: data.github || "",
                    })
                }
            }
        } catch (error) {
            console.error("Error fetching contact info:", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch("/api/contact", {
                method: contactId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactId ? { ...formData, id: contactId } : formData),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to save contact info")
            }

            const data = await response.json()
            if (!contactId && data.id) {
                setContactId(data.id)
            }
            toast.success("Contact info saved")
        } catch (error: any) {
            toast.error(error.message)
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
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Contact Information</h1>
                        <p className="text-muted-foreground">Update contact details</p>
                    </div>
                </div>

                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Email *</Label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label>Phone *</Label>
                                <Input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Address</Label>
                            <Input
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="123 Street, City, Country"
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold">Social Links</h3>

                            <div>
                                <Label>LinkedIn</Label>
                                <Input
                                    type="url"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    placeholder="https://linkedin.com/company/..."
                                />
                            </div>

                            <div>
                                <Label>Twitter</Label>
                                <Input
                                    type="url"
                                    value={formData.twitter}
                                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                    placeholder="https://twitter.com/..."
                                />
                            </div>

                            <div>
                                <Label>GitHub</Label>
                                <Input
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Save Contact Information
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    )
}
