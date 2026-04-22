"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { iconNames, getIcon } from "@/lib/icons"
import { ImagePicker } from "@/components/admin/image-picker"

export default function ProjectEditor() {
    const params = useParams()
    const router = useRouter()
    const isNew = params.id === "new"

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(!isNew)

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        category: "",
        description: "",
        longDescription: "",
        icon: "Sparkles",
        tags: "",
        gradient: "from-blue-500 to-cyan-500",
        features: "",
        videoUrl: "",
        testLink: "",
        image: ""
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
            if (!isNew) {
                fetchProject()
            }
        } catch (error) {
            router.push("/admin/login")
        }
    }

    const fetchProject = async () => {
        try {
            const response = await fetch(`/api/projects/${params.id}`)
            if (!response.ok) throw new Error("Failed to load project")

            const data = await response.json()

            setFormData({
                id: data.id,
                title: data.title,
                category: data.category,
                description: data.description,
                longDescription: data.longDescription || "",
                icon: data.icon,
                tags: (data.tags || []).join(", "),
                gradient: data.gradient,
                features: (data.features || []).join("\n"),
                videoUrl: data.videoUrl || "",
                testLink: data.testLink || "",
                image: data.image || ""
            })
        } catch (error) {
            toast.error("Failed to load project")
            router.push("/admin")
        } finally {
            setFetching(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const projectData = {
                ...formData,
                tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
                features: formData.features.split("\n").map(f => f.trim()).filter(Boolean),
            }

            // Generate ID from title if new and ID is empty
            if (isNew && !projectData.id) {
                projectData.id = projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
            }

            const response = await fetch("/api/projects", {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to save project")
            }

            toast.success("Project saved successfully")
            router.push("/admin/projects")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    const SelectedIcon = getIcon(formData.icon)

    return (
        <div className="min-h-screen bg-muted/30 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/admin/projects" className="text-muted-foreground hover:text-primary flex items-center mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                    </Link>
                    <h1 className="text-3xl font-bold">{isNew ? "Create Project" : "Edit Project"}</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Project ID (Slug)</Label>
                                    <Input
                                        value={formData.id}
                                        onChange={e => handleChange("id", e.target.value)}
                                        placeholder="auto-generated-from-title"
                                        disabled={!isNew}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={formData.title}
                                        onChange={e => handleChange("title", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Input
                                        value={formData.category}
                                        onChange={e => handleChange("category", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Icon</Label>
                                    <div className="flex gap-2">
                                        <div className="w-10 h-10 rounded border flex items-center justify-center bg-muted">
                                            <SelectedIcon className="w-5 h-5" />
                                        </div>
                                        <Select
                                            value={formData.icon}
                                            onValueChange={val => handleChange("icon", val)}
                                        >
                                            <SelectTrigger className="flex-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {iconNames.map(name => (
                                                    <SelectItem key={name} value={name}>{name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <ImagePicker 
                                label="Project Thumbnail (Optimal 1200x800)"
                                value={formData.image}
                                onChange={(val) => handleChange("image", val)}
                            />

                            <div className="space-y-2">
                                <Label>Short Description</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={e => handleChange("description", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Long Description</Label>
                                <Textarea
                                    value={formData.longDescription}
                                    onChange={e => handleChange("longDescription", e.target.value)}
                                    className="min-h-[150px]"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Tags (comma separated)</Label>
                                    <Input
                                        value={formData.tags}
                                        onChange={e => handleChange("tags", e.target.value)}
                                        placeholder="React, Next.js, AI"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Gradient Class</Label>
                                    <Input
                                        value={formData.gradient}
                                        onChange={e => handleChange("gradient", e.target.value)}
                                        placeholder="from-blue-500 to-cyan-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Features (one per line)</Label>
                                <Textarea
                                    value={formData.features}
                                    onChange={e => handleChange("features", e.target.value)}
                                    className="min-h-[150px]"
                                    placeholder="Real-time updates&#10;Secure authentication"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Video URL</Label>
                                    <Input
                                        value={formData.videoUrl}
                                        onChange={e => handleChange("videoUrl", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Test Link</Label>
                                    <Input
                                        value={formData.testLink}
                                        onChange={e => handleChange("testLink", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" /> Save Project
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    )
}
