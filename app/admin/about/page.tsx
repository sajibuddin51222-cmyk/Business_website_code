"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { iconNames } from "@/lib/icons"
import Image from "next/image"
import { ImagePicker } from "@/components/admin/image-picker"

export default function AboutManagement() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [points, setPoints] = useState<any[]>([])
    const [editing, setEditing] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "Users",
        image: "",
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
            fetchPoints()
        } catch (error) {
            router.push("/admin/login")
        } finally {
            setLoading(false)
        }
    }

    const fetchPoints = async () => {
        try {
            const response = await fetch("/api/about?activeOnly=false")
            const data = await response.json()
            setPoints(data || [])
        } catch (error) {
            console.error("Error fetching about points:", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const pointData = {
            ...formData,
            order: editing ? undefined : points.length + 1,
        }

        try {
            let response;
            if (editing) {
                response = await fetch("/api/about", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...pointData, id: editing }),
                })
            } else {
                response = await fetch("/api/about", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(pointData),
                })
            }

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to save point")
            }

            toast.success(editing ? "Point updated" : "Point created")
            resetForm()
            fetchPoints()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleEdit = (point: any) => {
        setEditing(point.id)
        setFormData({
            title: point.title,
            description: point.description,
            icon: point.icon,
            image: point.image || "",
        })
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this point?")) return

        try {
            const response = await fetch(`/api/about?id=${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to delete point")
            }

            toast.success("Point deleted")
            fetchPoints()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            icon: "Users",
            image: "",
        })
        setEditing(null)
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
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">About Section Management</h1>
                        <p className="text-muted-foreground">Manage "Why Choose Us" points</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <Card className="p-6 h-fit">
                        <h2 className="text-xl font-bold mb-4">{editing ? "Edit Point" : "Add New Point"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label>Title *</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label>Description *</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={4}
                                />
                            </div>

                            <ImagePicker 
                                label="Point Image/Icon (Optional)"
                                value={formData.image}
                                onChange={(val) => setFormData({ ...formData, image: val })}
                            />

                            <div>
                                <Label>Icon *</Label>
                                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {iconNames.map((icon) => (
                                            <SelectItem key={icon} value={icon}>
                                                {icon}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="flex-1">
                                    {editing ? "Update" : "Create"} Point
                                </Button>
                                {editing && (
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Card>

                    {/* List */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Existing Points ({points.length})</h2>
                        {points.map((point) => (
                            <Card key={point.id} className="p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        {point.image && (
                                            <div className="w-12 h-12 rounded overflow-hidden relative flex-shrink-0 border">
                                                <Image src={point.image} alt={point.title} fill className="object-cover" />
                                            </div>
                                        )}
                                        <h3 className="font-bold">{point.title}</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(point)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(point.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{point.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
