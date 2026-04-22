"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Edit, Trash2, Search, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { getIcon } from "@/lib/icons"
import Image from "next/image"

export default function ProjectsManagement() {
    const router = useRouter()
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")

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
            fetchProjects()
        } catch (error) {
            router.push("/admin/login")
        } finally {
            setLoading(false)
        }
    }

    const fetchProjects = async () => {
        try {
            const response = await fetch("/api/projects")
            const data = await response.json()
            setProjects(data || [])
        } catch (error) {
            toast.error("Failed to fetch projects")
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return

        try {
            setDeleting(id)
            const response = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete project")
            
            setProjects(projects.filter(p => p.id !== id))
            toast.success("Project deleted successfully")
        } catch (error) {
            toast.error("Failed to delete project")
        } finally {
            setDeleting(null)
        }
    }

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Projects Management</h1>
                            <p className="text-muted-foreground">Manage your portfolio projects</p>
                        </div>
                    </div>
                    <Link href="/admin/projects/new">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Project
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects by title or category..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Projects List */}
                {filteredProjects.length === 0 ? (
                    <Card className="p-12 text-center">
                        <p className="text-muted-foreground mb-4">No projects found</p>
                        <Link href="/admin/projects/new">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Create First Project
                            </Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {filteredProjects.map((project) => {
                            const Icon = getIcon(project.icon)
                            return (
                                <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4 flex-1">
                                            {/* Icon or Image */}
                                            <div className={`w-12 h-12 rounded-lg ${!project.image ? `bg-gradient-to-br ${project.gradient}` : 'border'} flex items-center justify-center flex-shrink-0 overflow-hidden relative`}>
                                                {project.image ? (
                                                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                                                ) : (
                                                    <Icon className="w-6 h-6 text-white" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold">{project.title}</h3>
                                                <p className="text-sm text-primary font-medium">{project.category}</p>
                                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{project.description}</p>

                                                {/* Tags */}
                                                {project.tags && project.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {project.tags.slice(0, 3).map((tag: string) => (
                                                            <span key={tag} className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {project.tags.length > 3 && (
                                                            <span className="inline-block px-2 py-1 text-muted-foreground text-xs">
                                                                +{project.tags.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 ml-4">
                                            <Link href={`/admin/projects/${project.id}`}>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(project.id)}
                                                disabled={deleting === project.id}
                                            >
                                                {deleting === project.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                )}

                {/* Stats */}
                <div className="mt-8 pt-8 border-t">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-bold">{filteredProjects.length}</span> of <span className="font-bold">{projects.length}</span> projects
                    </p>
                </div>
            </div>
        </div>
    )
}
