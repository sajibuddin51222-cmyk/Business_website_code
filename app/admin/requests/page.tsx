"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ProjectRequests() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [requests, setRequests] = useState<any[]>([])

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
            fetchRequests()
        } catch (error) {
            router.push("/admin/login")
        } finally {
            setLoading(false)
        }
    }

    const fetchRequests = async () => {
        try {
            const response = await fetch("/api/requests")
            if (response.ok) {
                const data = await response.json()
                setRequests(data || [])
            }
        } catch (error) {
            console.error("Error fetching requests:", error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new":
                return "bg-blue-500"
            case "contacted":
                return "bg-yellow-500"
            case "closed":
                return "bg-green-500"
            default:
                return "bg-gray-500"
        }
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
                        <h1 className="text-3xl font-bold">Project Requests</h1>
                        <p className="text-muted-foreground">View and manage form submissions</p>
                    </div>
                </div>

                {requests.length === 0 ? (
                    <Card className="p-12 text-center">
                        <p className="text-muted-foreground">No project requests yet</p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {requests.map((request) => (
                            <Link key={request.id} href={`/admin/requests/${request.id}`}>
                                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{request.name}</h3>
                                            <p className="text-sm text-muted-foreground">{request.email}</p>
                                        </div>
                                        <Badge className={getStatusColor(request.status)}>
                                            {request.status}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">Project Type:</span>
                                            <p className="font-medium">{request.projectType}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Budget:</span>
                                            <p className="font-medium">{request.budget}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Timeline:</span>
                                            <p className="font-medium">{request.timeline}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Submitted:</span>
                                            <p className="font-medium">
                                                {new Date(request.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
