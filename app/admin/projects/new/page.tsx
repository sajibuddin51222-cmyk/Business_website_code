"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { iconNames } from "@/lib/icons"
import { parseJsonResponse } from "@/lib/utils"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import { ImagePicker } from "@/components/admin/image-picker"

function slugify(title: string) {
  const s = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72)
  return s || `project-${Date.now()}`
}

function splitList(s: string) {
  return s
    .split(/[,|\n]/)
    .map((x) => x.trim())
    .filter(Boolean)
}

export default function NewProjectPage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [title, setTitle] = useState("")
  const [id, setId] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [longDescription, setLongDescription] = useState("")
  const [icon, setIcon] = useState("Globe")
  const [gradient, setGradient] = useState("from-blue-500 to-cyan-500")
  const [tags, setTags] = useState("React, TypeScript, PostgreSQL")
  const [features, setFeatures] = useState(
    "Feature one, Feature two, Feature three"
  )
  const [videoUrl, setVideoUrl] = useState("")
  const [testLink, setTestLink] = useState("#")
  const [image, setImage] = useState("/images/portfolio_1.png")
  const [screenshots, setScreenshots] = useState("/placeholder.jpg, /placeholder.jpg")

  function onTitleBlur() {
    if (!id.trim() && title.trim()) setId(slugify(title))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const pid = id.trim() || slugify(title)
    if (!pid) {
      toast.error("Set a title or project ID")
      return
    }
    setPending(true)
    try {
      const body = {
        id: pid,
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        longDescription: longDescription.trim(),
        icon,
        gradient: gradient.trim(),
        tags: splitList(tags),
        features: splitList(features),
        videoUrl: videoUrl.trim() || undefined,
        testLink: testLink.trim() || "#",
        image: image.trim() || undefined,
        screenshots: splitList(screenshots),
      }
      const res = await fetch("/api/projects", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await parseJsonResponse<{ error?: string }>(res, {})
      if (!res.ok) throw new Error(data.error || "Could not create project")
      toast.success("Project created")
      router.push("/admin/projects")
      router.refresh()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 gap-1">
        <Link href="/admin/projects">
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>New project</CardTitle>
          <CardDescription>
            IDs become the URL slug: <code className="text-xs">/portfolio/[id]</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={onTitleBlur}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Project ID (slug)</Label>
                <Input
                  id="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="auto from title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="long">Long description</Label>
              <Textarea
                id="long"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select value={icon} onValueChange={setIcon}>
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
              <div className="space-y-2">
                <Label htmlFor="gradient">Gradient classes</Label>
                <Input
                  id="gradient"
                  value={gradient}
                  onChange={(e) => setGradient(e.target.value)}
                  placeholder="from-blue-500 to-cyan-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Textarea
                id="features"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <ImagePicker
                  label="Cover image"
                  hint="Shown in portfolio cards and at the top of the project page."
                  value={image}
                  onChange={setImage}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testLink">Demo / test link</Label>
                <Input
                  id="testLink"
                  value={testLink}
                  onChange={(e) => setTestLink(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-3">
              <ImagePicker
                label="Add screenshot"
                hint="Upload or link each gallery image; URLs are appended below. You can still edit the list by hand."
                value=""
                previewOnlyExternal
                onChange={(url) =>
                  setScreenshots((s) => (s.trim() ? `${s.trim()}, ${url}` : url))
                }
              />
              <div className="space-y-2">
                <Label htmlFor="shots">Screenshots (comma-separated URLs or paths)</Label>
                <Input
                  id="shots"
                  value={screenshots}
                  onChange={(e) => setScreenshots(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="video">Video embed URL (optional)</Label>
              <Input
                id="video"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={pending}>
                {pending ? "Saving…" : "Create project"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/projects">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
