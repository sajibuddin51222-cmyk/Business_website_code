"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function RequestDetail() {
    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [request, setRequest] = useState<any>(null)
    const [status, setStatus] = useState("")

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
            fetchRequest()
        } catch (error) {
            router.push("/admin/login")
        } finally {
            setLoading(false)
        }
    }

    const fetchRequest = async () => {
        try {
            const response = await fetch(`/api/requests/${params.id}`)
            if (response.ok) {
                const data = await response.json()
                setRequest(data)
                setStatus(data.status)
            } else {
                toast.error("Failed to load request")
            }
        } catch (error) {
            console.error("Error fetching request:", error)
            toast.error("Failed to load request")
        }
    }

    const updateStatus = async (newStatus: string) => {
        try {
            const response = await fetch("/api/requests", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: params.id, status: newStatus }),
            })

            if (!response.ok) throw new Error("Failed to update status")

            setStatus(newStatus)
            toast.success("Status updated")
        } catch (error) {
            toast.error("Failed to update status")
        }
    }

    if (loading || !request) {
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
                    <Link href="/admin/requests">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">Request Details</h1>
                        <p className="text-muted-foreground">Submitted on {new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Select value={status} onValueChange={updateStatus}>
                        <SelectTrigger className="w-40">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-6">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-muted-foreground">Name</label>
                                <p className="font-medium">{request.name}</p>
                            </div>
                            <div>
                                <label className="text-sm text-muted-foreground">Email</label>
                                <p className="font-medium">{request.email}</p>
                            </div>
                            <div>
                                <label className="text-sm text-muted-foreground">Phone</label>
                                <p className="font-medium">{request.phone}</p>
                            </div>
                            <div>
                                <label className="text-sm text-muted-foreground">Company</label>
                                <p className="font-medium">{request.company || "N/A"}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Project Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="text-sm text-muted-foreground">Project Type</label>
                                <p className="font-medium">{request.projectType}</p>
                            </div>
                            <div>
                                <label className="text-sm text-muted-foreground">Budget</label>
                                <p className="font-medium">{request.budget}</p>
                            </div>
                            <div>
                                <label className="text-sm text-muted-foreground">Timeline</label>
                                <p className="font-medium">{request.timeline}</p>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground">Description</label>
                            <p className="mt-2 whitespace-pre-wrap">{request.description}</p>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Services Needed</h2>
                        <div className="flex flex-wrap gap-2">
                            {request.services && request.services.map((service: string) => (
                                <Badge key={service} variant="outline">
                                    {service}
                                </Badge>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Additional Requirements</h2>
                        <div className="space-y-2">
                            {request.hasDesign && <p>✓ Has design files (Figma, Sketch, etc.)</p>}
                            {request.needsHosting && <p>✓ Needs hosting and domain setup</p>}
                            {request.needsPlayStore && <p>✓ Needs Google Play Console setup</p>}
                            {request.needsAppStore && <p>✓ Needs Apple Developer account setup</p>}
                            {!request.hasDesign && !request.needsHosting && !request.needsPlayStore && !request.needsAppStore && (
                                <p className="text-muted-foreground">No additional requirements</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
