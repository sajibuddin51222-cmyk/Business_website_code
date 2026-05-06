"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
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
import { Switch } from "@/components/ui/switch"
import { parseJsonResponse } from "@/lib/utils"
import { toast } from "sonner"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function EditCmsPage() {
  const params = useParams()
  const slug = decodeURIComponent(String(params.slug ?? ""))
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (!slug) return
    ;(async () => {
      try {
        const res = await adminFetch(`/api/pages/${encodeURIComponent(slug)}`)
        const data = await parseJsonResponse<{
          title?: string
          content?: string
          isActive?: boolean
          error?: string
        }>(res, {})
        if (!res.ok) throw new Error(data.error || "Not found")
        setTitle(data.title ?? "")
        setContent(data.content ?? "")
        setIsActive(data.isActive ?? true)
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Load failed")
        router.push("/admin/pages")
      } finally {
        setLoading(false)
      }
    })()
  }, [slug, router])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    try {
      const res = await adminFetch(`/api/pages/${encodeURIComponent(slug)}`, {
        method: "PUT",
        body: JSON.stringify({ title, content, isActive }),
      })
      const err = await parseJsonResponse<{ error?: string }>(res, {})
      if (!res.ok) throw new Error(err.error || "Save failed")
      toast.success("Page saved")
      router.refresh()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    } finally {
      setPending(false)
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
    <div className="space-y-6 max-w-4xl">
      <Button variant="ghost" size="sm" asChild className="-ml-2 gap-1">
        <Link href="/admin/pages">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit page</CardTitle>
          <CardDescription className="font-mono text-xs">
            /{slug}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">HTML body</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="font-mono text-sm"
                required
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
              <Label htmlFor="active">Published</Label>
            </div>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
