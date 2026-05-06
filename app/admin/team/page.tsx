"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { adminFetch } from "@/lib/admin-api"
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
import { ExternalLink, Plus, Trash2 } from "lucide-react"

type Member = {
  id: string
  name: string
  role: string
  image: string
  order: number
  isActive: boolean
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const res = await adminFetch("/api/team?all=true")
      const data = await parseJsonResponse<unknown>(res, [])
      setMembers(Array.isArray(data) ? (data as Member[]) : [])
    } catch {
      toast.error("Could not load team")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function remove(id: string, name: string) {
    if (!confirm(`Remove ${name}?`)) return
    try {
      const res = await adminFetch(`/api/team/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      toast.success("Removed")
      load()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Delete failed")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
          <p className="text-muted-foreground text-sm">
            Appears on <code className="text-xs">/our-team</code>
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/team/new">
            <Plus className="mr-2 h-4 w-4" /> Add member
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>{loading ? "Loading…" : `${members.length} record(s)`}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3 font-medium">Order</th>
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Role</th>
                  <th className="p-3 font-medium">Active</th>
                  <th className="p-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((m) => (
                    <tr key={m.id} className="border-t">
                      <td className="p-3">{m.order}</td>
                      <td className="p-3 font-medium">{m.name}</td>
                      <td className="p-3 text-muted-foreground">{m.role}</td>
                      <td className="p-3">{m.isActive ? "Yes" : "No"}</td>
                      <td className="p-3 text-right space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/our-team`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/team/${m.id}`}>Edit</Link>
                        </Button>
                        <Button variant="destructive" size="sm" type="button" onClick={() => remove(m.id, m.name)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
