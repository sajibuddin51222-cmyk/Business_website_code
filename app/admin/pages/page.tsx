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

type PageRow = {
  id: string
  slug: string
  title: string
  isActive: boolean
}

export default function AdminPagesListPage() {
  const [pages, setPages] = useState<PageRow[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const res = await adminFetch("/api/pages")
      const data = await parseJsonResponse<unknown>(res, [])
      setPages(Array.isArray(data) ? (data as PageRow[]) : [])
    } catch {
      toast.error("Could not load pages")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function remove(slug: string, title: string) {
    if (!confirm(`Delete page “${title}”?`)) return
    try {
      const res = await adminFetch(`/api/pages/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const e = await parseJsonResponse<{ error?: string }>(res, {})
        throw new Error(e.error || "Delete failed")
      }
      toast.success("Page deleted")
      load()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">CMS pages</h1>
          <p className="text-muted-foreground text-sm">
            Legal, careers, blog index, FAQ — served at <code className="text-xs">/{'{slug}'}</code>
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/pages/new">
            <Plus className="mr-2 h-4 w-4" /> New page
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All pages</CardTitle>
          <CardDescription>
            {loading ? "Loading…" : `${pages.length} page(s). Inactive pages return 404 on the site.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3 font-medium">Slug</th>
                  <th className="p-3 font-medium">Title</th>
                  <th className="p-3 font-medium">Active</th>
                  <th className="p-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3 font-mono text-xs">{p.slug}</td>
                    <td className="p-3">{p.title}</td>
                    <td className="p-3">{p.isActive ? "Yes" : "No"}</td>
                    <td className="p-3 text-right space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/${p.slug}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/pages/edit/${p.slug}`}>Edit</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        type="button"
                        onClick={() => remove(p.slug, p.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {!loading && pages.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      No CMS pages — create one or run <code className="text-xs">npm run db:seed</code>
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
