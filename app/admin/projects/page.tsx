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
import { ExternalLink, Plus, Trash2 } from "lucide-react"

type ProjectRow = {
  id: string
  title: string
  category: string
  description: string
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/projects")
      const data = await parseJsonResponse<unknown>(res, [])
      setProjects(Array.isArray(data) ? (data as ProjectRow[]) : [])
    } catch {
      toast.error("Could not load projects")
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function remove(id: string, title: string) {
    if (!confirm(`Delete “${title}”? This cannot be undone.`)) return
    try {
      const res = await fetch(`/api/projects/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) {
        const err = await parseJsonResponse<{ error?: string }>(res, {})
        throw new Error(err.error || "Delete failed")
      }
      toast.success("Project deleted")
      load()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Delete failed")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-sm">
            Featured work shown on the homepage portfolio section and detail pages.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Add project
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All projects</CardTitle>
          <CardDescription>
            {loading ? "Loading…" : `${projects.length} project(s) in the database.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3 font-medium">Title</th>
                  <th className="p-3 font-medium">Category</th>
                  <th className="hidden md:table-cell p-3 font-medium">Summary</th>
                  <th className="p-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3 font-medium">{p.title}</td>
                    <td className="p-3 text-muted-foreground">{p.category}</td>
                    <td className="hidden md:table-cell p-3 text-muted-foreground max-w-md truncate">
                      {p.description}
                    </td>
                    <td className="p-3 text-right space-x-2 whitespace-nowrap">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/portfolio/${p.id}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        type="button"
                        onClick={() => remove(p.id, p.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {!loading && projects.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      No projects yet. Seed the database or add one above.
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
