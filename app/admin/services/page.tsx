"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { parseJsonResponse } from "@/lib/utils"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

type ServiceRow = {
  id: string
  title: string
  description: string
  order: number
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceRow[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/services?activeOnly=false")
      const data = await parseJsonResponse<unknown>(res, [])
      setServices(Array.isArray(data) ? (data as ServiceRow[]) : [])
    } catch {
      toast.error("Could not load services")
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function remove(id: string, title: string) {
    if (!confirm(`Delete service “${title}”?`)) return
    try {
      const res = await fetch(
        `/api/services?id=${encodeURIComponent(id)}`,
        { method: "DELETE", credentials: "include" }
      )
      if (!res.ok) {
        const err = await parseJsonResponse<{ error?: string }>(res, {})
        throw new Error(err.error || "Delete failed")
      }
      toast.success("Service deleted")
      load()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Delete failed")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Services</h1>
          <p className="text-muted-foreground text-sm">
            Service cards on the homepage — ten software delivery lines.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Add service
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All services</CardTitle>
          <CardDescription>
            {loading ? "Loading…" : `${services.length} service(s).`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3 font-medium">Order</th>
                  <th className="p-3 font-medium">Title</th>
                  <th className="hidden md:table-cell p-3 font-medium">Description</th>
                  <th className="p-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((s) => (
                    <tr key={s.id} className="border-t">
                      <td className="p-3 tabular-nums text-muted-foreground">{s.order}</td>
                      <td className="p-3 font-medium">{s.title}</td>
                      <td className="hidden md:table-cell p-3 text-muted-foreground max-w-lg truncate">
                        {s.description}
                      </td>
                      <td className="p-3 text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          type="button"
                          onClick={() => remove(s.id, s.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                {!loading && services.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      No services. Run the seed script or add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
