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

function splitList(s: string) {
  return s
    .split(/[,|\n]/)
    .map((x) => x.trim())
    .filter(Boolean)
}

export default function NewServicePage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("Globe")
  const [gradient, setGradient] = useState("from-blue-500 to-cyan-500")
  const [features, setFeatures] = useState(
    "Deliverable one, Deliverable two, Deliverable three"
  )
  const [order, setOrder] = useState("99")
  const [image, setImage] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    try {
      const body = {
        title: title.trim(),
        description: description.trim(),
        icon,
        gradient: gradient.trim(),
        features: splitList(features),
        order: Number.parseInt(order, 10) || 0,
        isActive: true,
        image: image.trim() || undefined,
      }
      const res = await fetch("/api/services", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await parseJsonResponse<{ error?: string }>(res, {})
      if (!res.ok) throw new Error(data.error || "Could not create service")
      toast.success("Service created")
      router.push("/admin/services")
      router.refresh()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 gap-1">
        <Link href="/admin/services">
          <ArrowLeft className="h-4 w-4" />
          Back to services
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>New service</CardTitle>
          <CardDescription>
            Appears in the Services section on the homepage (ordered by{" "}
            <span className="font-medium">order</span>).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
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
                <Label htmlFor="order">Sort order</Label>
                <Input
                  id="order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  min={0}
                />
              </div>
            </div>
            <ImagePicker
              label="Card image (optional)"
              hint="Overrides the default illustration on the homepage services grid when set."
              value={image}
              onChange={setImage}
            />
            <div className="space-y-2">
              <Label htmlFor="gradient">Gradient classes</Label>
              <Input
                id="gradient"
                value={gradient}
                onChange={(e) => setGradient(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Feature bullets (comma-separated)</Label>
              <Textarea
                id="features"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={pending}>
                {pending ? "Saving…" : "Create service"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/services">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
