"use client"

import { useEffect, useState } from "react"
import { adminFetch } from "@/lib/admin-api"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { parseJsonResponse } from "@/lib/utils"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

type Inquiry = {
  id: string
  name: string
  email: string
  phone: string
  company: string | null
  projectType: string
  budget: string
  timeline: string
  description: string
  status: string
  createdAt: string
}

const STATUSES = ["new", "reviewing", "quoted", "won", "lost", "archived"]

export default function AdminInquiriesPage() {
  const [rows, setRows] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const res = await adminFetch("/api/requests")
      const data = await parseJsonResponse<unknown>(res, [])
      setRows(Array.isArray(data) ? (data as Inquiry[]) : [])
    } catch {
      toast.error("Could not load inquiries")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function setStatus(id: string, status: string) {
    try {
      const res = await adminFetch("/api/requests", {
        method: "PATCH",
        body: JSON.stringify({ id, status }),
      })
      if (!res.ok) throw new Error("Update failed")
      toast.success("Status updated")
      load()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Update failed")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Form inquiries</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Submissions from the start-project / contact flows.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All requests</CardTitle>
          <CardDescription>{rows.length} total</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t align-top">
                  <td className="p-3 whitespace-nowrap text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3 font-mono text-xs">{r.email}</td>
                  <td className="p-3">{r.projectType}</td>
                  <td className="p-3 min-w-[140px]">
                    <Select value={r.status} onValueChange={(v) => setStatus(r.id, v)}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No inquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
