"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Play, Download, ExternalLink, Image as ImageIcon, ArrowLeft, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getIcon } from "@/lib/icons"

export default function ProjectDetail() {
    const params = useParams()
    const [project, setProject] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            fetchProject()
        }
    }, [params.id])

    const fetchProject = async () => {
        try {
            const response = await fetch(`/api/projects/${params.id}`)
            if (response.status === 404) {
                setProject(null)
            } else {
                const data = await response.json()
                setProject(data)
            }
        } catch (error) {
            console.error("Error fetching project:", error)
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!project) {
        return notFound()
    }

    const Icon = getIcon(project.icon)

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4">
                <Link href="/#portfolio" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
                                    <Badge variant="secondary" className="text-sm">{project.category}</Badge>
                                </div>
                            </div>

                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {project.longDescription}
                                </p>
                            </div>
                        </div>

                        {/* Video Section */}
                        <div>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Play className="w-5 h-5 text-primary" /> Project Demo
                            </h2>
                            <div className="aspect-video bg-black/10 rounded-xl flex items-center justify-center border border-border/50 overflow-hidden shadow-lg">
                                {project.videoUrl ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={project.videoUrl}
                                        title="Project Demo"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div className="text-center p-8">
                                        <Play className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                                        <p className="text-muted-foreground">Demo video coming soon</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Screenshots */}
                        {project.screenshots && project.screenshots.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-primary" /> Screenshots
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.screenshots.map((shot: string, idx: number) => (
                                        <div key={idx} className="aspect-video bg-muted rounded-xl overflow-hidden relative group shadow-md border border-border/50">
                                            <Image
                                                src={shot}
                                                alt={`Screenshot ${idx + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm sticky top-24">
                            <h3 className="text-lg font-bold mb-4">Project Details</h3>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags && project.tags.map((tag: string) => (
                                            <Badge key={tag} variant="outline" className="bg-background">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Key Features</h4>
                                    <ul className="space-y-2">
                                        {project.features && project.features.map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-border/50">
                                {project.testLink && (
                                    <>
                                        <Button className="w-full gradient-primary glow-primary" asChild>
                                            <a href={project.testLink} target="_blank" rel="noopener noreferrer">
                                                <Download className="w-4 h-4 mr-2" /> Download Test APK
                                            </a>
                                        </Button>
                                        <Button variant="outline" className="w-full" asChild>
                                            <a href={project.testLink} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4 mr-2" /> Visit Live Site
                                            </a>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
