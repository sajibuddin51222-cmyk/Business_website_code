"use client"

import { useEffect, useState } from "react"
import { adminFetch } from "@/lib/admin-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Switch } from "@/components/ui/switch"
import { parseJsonResponse } from "@/lib/utils"
import { toast } from "sonner"
import { Loader2, Plus, Trash2 } from "lucide-react"

type FooterLink = {
  id: string
  title: string
  url: string
  column: string
  order: number
  isActive: boolean
}

const COLUMNS = ["Services", "Company", "Support"]

export default function AdminFooterPage() {
  const [links, setLinks] = useState<FooterLink[]>([])
  const [loading, setLoading] = useState(true)
  const [newRow, setNewRow] = useState({
    title: "",
    url: "",
    column: "Company",
    order: "1",
  })

  async function load() {
    setLoading(true)
    try {
      const res = await fetch("/api/footer-links")
      const data = await parseJsonResponse<unknown>(res, [])
      setLinks(Array.isArray(data) ? (data as FooterLink[]) : [])
    } catch {
      toast.error("Could not load footer links")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function saveLink(link: FooterLink) {
    try {
      const res = await adminFetch(`/api/footer-links/${link.id}`, {
        method: "PUT",
        body: JSON.stringify(link),
      })
      const err = await parseJsonResponse<{ error?: string }>(res, {})
      if (!res.ok) throw new Error(err.error || "Save failed")
      toast.success("Link saved")
      load()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Save failed")
    }
  }

  async function deleteLink(id: string) {
    if (!confirm("Remove this footer link?")) return
    try {
      const res = await adminFetch(`/api/footer-links/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      toast.success("Removed")
      load()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Delete failed")
    }
  }

  async function addLink(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await adminFetch("/api/footer-links", {
        method: "POST",
        body: JSON.stringify({
          title: newRow.title,
          url: newRow.url,
          column: newRow.column,
          order: parseInt(newRow.order, 10) || 0,
          isActive: true,
        }),
      })
      const err = await parseJsonResponse<{ error?: string }>(res, {})
      if (!res.ok) throw new Error(err.error || "Add failed")
      toast.success("Link added")
      setNewRow({ title: "", url: "", column: "Company", order: "1" })
      load()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Add failed")
    }
  }

  const grouped = COLUMNS.map((col) => ({
    column: col,
    items: links.filter((l) => l.column === col).sort((a, b) => a.order - b.order),
  }))

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
        <h1 className="text-2xl font-semibold tracking-tight">Footer navigation</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Three columns — matches the public footer layout.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addLink} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 items-end">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={newRow.title}
                onChange={(e) => setNewRow((s) => ({ ...s, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>URL</Label>
              <Input
                value={newRow.url}
                onChange={(e) => setNewRow((s) => ({ ...s, url: e.target.value }))}
                placeholder="/faq or https://…"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Column</Label>
              <Select
                value={newRow.column}
                onValueChange={(v) => setNewRow((s) => ({ ...s, column: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COLUMNS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Order</Label>
              <Input
                type="number"
                value={newRow.order}
                onChange={(e) => setNewRow((s) => ({ ...s, order: e.target.value }))}
              />
            </div>
            <Button type="submit" className="lg:col-span-5 w-fit">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </form>
        </CardContent>
      </Card>

      {grouped.map(({ column, items }) => (
        <Card key={column}>
          <CardHeader>
            <CardTitle>{column}</CardTitle>
            <CardDescription>{items.length} link(s)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {items.map((link) => (
              <FooterLinkEditor
                key={link.id}
                link={link}
                onSave={saveLink}
                onDelete={() => deleteLink(link.id)}
              />
            ))}
            {items.length === 0 && (
              <p className="text-sm text-muted-foreground">No links in this column.</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function FooterLinkEditor({
  link,
  onSave,
  onDelete,
}: {
  link: FooterLink
  onSave: (l: FooterLink) => void
  onDelete: () => void
}) {
  const [draft, setDraft] = useState(link)
  useEffect(() => setDraft(link), [link])

  return (
    <div className="rounded-xl border bg-card/50 p-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label className="text-xs">Title</Label>
          <Input
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
          />
        </div>
        <div className="space-y-2 lg:col-span-2">
          <Label className="text-xs">URL</Label>
          <Input
            value={draft.url}
            onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
          />
        </div>
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
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="text-xs">Column</Label>
          <Select
            value={draft.column}
            onValueChange={(v) => setDraft((d) => ({ ...d, column: v }))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COLUMNS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={draft.isActive}
            onCheckedChange={(v) => setDraft((d) => ({ ...d, isActive: v }))}
          />
          <span className="text-sm text-muted-foreground">Visible</span>
        </div>
        <div className="ml-auto flex gap-2">
          <Button type="button" size="sm" onClick={() => onSave(draft)}>
            Save
          </Button>
          <Button type="button" variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
