"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { ArrowLeft } from "lucide-react"

export default function NewCmsPage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [slug, setSlug] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("<h2>Section title</h2>\n<p>Paragraph copy.</p>")
  const [isActive, setIsActive] = useState(true)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    try {
      const res = await adminFetch("/api/pages", {
        method: "POST",
        body: JSON.stringify({
          slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
          title: title.trim(),
          content,
          isActive,
        }),
      })
      const err = await parseJsonResponse<{ error?: string }>(res, {})
      if (!res.ok) throw new Error(err.error || "Create failed")
      toast.success("Page created")
      router.push("/admin/pages")
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Create failed")
    } finally {
      setPending(false)
    }
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
          <CardTitle>New CMS page</CardTitle>
          <CardDescription>
            Use semantic HTML (<code className="text-xs">h2</code>, <code className="text-xs">p</code>,{" "}
            <code className="text-xs">ul</code>). Content is sanitized on the public site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slug">URL slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="privacy-policy"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">HTML body</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={18}
                className="font-mono text-sm"
                required
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
              <Label htmlFor="active">Published (active)</Label>
            </div>
            <Button type="submit" disabled={pending}>
              {pending ? "Creating…" : "Create page"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
