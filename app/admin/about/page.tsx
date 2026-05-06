"use client"

import { useEffect, useState } from "react"
import { adminFetch } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Loader2, Trash2 } from "lucide-react"
import { iconNames } from "@/lib/icons"

type Point = {
  id: string
  title: string
  description: string
  icon: string
  order: number
}

export default function AdminAboutPage() {
  const [points, setPoints] = useState<Point[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "Globe",
    order: "1",
  })

  async function load() {
    setLoading(true)
    try {
      const res = await fetch("/api/about?activeOnly=false")
      const data = await parseJsonResponse<unknown>(res, [])
      setPoints(Array.isArray(data) ? (data as Point[]) : [])
    } catch {
      toast.error("Could not load points")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function addPoint(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await adminFetch("/api/about", {
        method: "POST",
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          icon: form.icon,
          order: parseInt(form.order, 10) || 0,
          isActive: true,
        }),
      })
      const err = await parseJsonResponse<{ error?: string }>(res, {})
      if (!res.ok) throw new Error(err.error || "Add failed")
      toast.success("Point added")
      setForm({ title: "", description: "", icon: "Globe", order: String(points.length + 1) })
      load()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Add failed")
    }
  }

  async function savePoint(p: Point) {
    try {
      const res = await adminFetch("/api/about", {
        method: "PUT",
        body: JSON.stringify({
          id: p.id,
          title: p.title,
          description: p.description,
          icon: p.icon,
          order: p.order,
          isActive: true,
        }),
      })
      const err = await parseJsonResponse<{ error?: string }>(res, {})
      if (!res.ok) throw new Error(err.error || "Save failed")
      toast.success("Saved")
      load()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    }
  }

  async function deletePoint(id: string) {
    if (!confirm("Delete this point?")) return
    try {
      const res = await adminFetch(`/api/about?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Delete failed")
      toast.success("Deleted")
      load()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">About section</h1>
        <p className="text-muted-foreground text-sm mt-1">
          “Why choose us” cards on the homepage — below services.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add point</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addPoint} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select value={form.icon} onValueChange={(v) => setForm((f) => ({ ...f, icon: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {iconNames.map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Order</Label>
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Add point</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {points
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((p) => (
            <AboutCard key={p.id} point={p} onSave={savePoint} onDelete={() => deletePoint(p.id)} />
          ))}
      </div>
    </div>
  )
}

function AboutCard({
  point,
  onSave,
  onDelete,
}: {
  point: Point
  onSave: (p: Point) => void
  onDelete: () => void
}) {
  const [draft, setDraft] = useState(point)
  useEffect(() => setDraft(point), [point])

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-lg">{draft.title}</CardTitle>
          <CardDescription>Order {draft.order}</CardDescription>
        </div>
        <Button variant="destructive" size="sm" type="button" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-xs">Title</Label>
            <Input value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Icon</Label>
            <Select value={draft.icon} onValueChange={(v) => setDraft((d) => ({ ...d, icon: v }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {iconNames.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Description</Label>
          <Textarea
            value={draft.description}
            onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
            rows={3}
          />
        </div>
        <div className="flex gap-3 items-end">
          <div className="space-y-2">
            <Label className="text-xs">Order</Label>
            <Input
              type="number"
              value={draft.order}
              onChange={(e) =>
                setDraft((d) => ({ ...d, order: parseInt(e.target.value, 10) || 0 }))
              }
            />
          </div>
          <Button type="button" onClick={() => onSave(draft)}>
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
