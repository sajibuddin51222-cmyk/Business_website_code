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

export default function ServicesManagement() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [services, setServices] = useState<any[]>([])
    const [editing, setEditing] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "Globe",
        image: "",
        gradient: "from-blue-500 to-cyan-500",
        features: [""],
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
            fetchServices()
        } catch (error) {
            router.push("/admin/login")
        } finally {
            setLoading(false)
        }
    }

    const fetchServices = async () => {
        try {
            const response = await fetch("/api/services?activeOnly=false")
            const data = await response.json()
            setServices(data || [])
        } catch (error) {
            console.error("Error fetching services:", error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const serviceData = {
            ...formData,
            features: formData.features.filter(f => f.trim() !== ""),
        }

        try {
            let response;
            if (editing) {
                response = await fetch("/api/services", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...serviceData, id: editing }),
                })
            } else {
                response = await fetch("/api/services", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...serviceData, order: services.length + 1 }),
                })
            }

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to save service")
            }

            toast.success(editing ? "Service updated" : "Service created")
            resetForm()
            fetchServices()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleEdit = (service: any) => {
        setEditing(service.id)
        setFormData({
            title: service.title,
            description: service.description,
            icon: service.icon,
            image: service.image || "",
            gradient: service.gradient,
            features: service.features || [""],
        })
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return

        try {
            const response = await fetch(`/api/services?id=${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to delete service")
            }

            toast.success("Service deleted")
            fetchServices()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            icon: "Globe",
            image: "",
            gradient: "from-blue-500 to-cyan-500",
            features: [""],
        })
        setEditing(null)
    }

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ""] })
    }

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...formData.features]
        newFeatures[index] = value
        setFormData({ ...formData, features: newFeatures })
    }

    const removeFeature = (index: number) => {
        setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) })
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
                        <h1 className="text-3xl font-bold">Services Management</h1>
                        <p className="text-muted-foreground">Manage services offered</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <Card className="p-6 h-fit">
                        <h2 className="text-xl font-bold mb-4">{editing ? "Edit Service" : "Add New Service"}</h2>
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
                                />
                            </div>

                            <ImagePicker 
                                label="Service Image (Optimal 800x600)"
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

                            <div>
                                <Label>Gradient *</Label>
                                <Input
                                    value={formData.gradient}
                                    onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                                    placeholder="from-blue-500 to-cyan-500"
                                    required
                                />
                            </div>

                            <div>
                                <Label>Features</Label>
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <Input
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            placeholder="Feature"
                                        />
                                        <Button type="button" variant="outline" size="icon" onClick={() => removeFeature(index)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Feature
                                </Button>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="flex-1">
                                    {editing ? "Update" : "Create"} Service
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
                        <h2 className="text-xl font-bold">Existing Services ({services.length})</h2>
                        {services.map((service) => (
                            <Card key={service.id} className="p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        {service.image && (
                                            <div className="w-16 h-12 rounded overflow-hidden relative flex-shrink-0 border">
                                                <Image src={service.image} alt={service.title} fill className="object-cover" />
                                            </div>
                                        )}
                                        <h3 className="font-bold text-lg">{service.title}</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {service.features && service.features.map((feature: string, i: number) => (
                                        <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
