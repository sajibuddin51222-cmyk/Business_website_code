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
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { parseJsonResponse } from "@/lib/utils"
import { toast } from "sonner"
import { ArrowLeft, Loader2 } from "lucide-react"
import { ImagePicker } from "@/components/admin/image-picker"

export default function EditTeamMemberPage() {
  const params = useParams()
  const id = String(params.id ?? "")
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [image, setImage] = useState("")
  const [bio, setBio] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [twitter, setTwitter] = useState("")
  const [github, setGithub] = useState("")
  const [order, setOrder] = useState("0")
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await adminFetch(`/api/team?all=true`)
        const list = await parseJsonResponse<{ id: string }[]>(res, [])
        const m = list.find((x) => x.id === id) as
          | {
              name: string
              role: string
              image: string
              bio: string | null
              linkedin: string | null
              twitter: string | null
              github: string | null
              order: number
              isActive: boolean
            }
          | undefined
        if (!m) throw new Error("Not found")
        setName(m.name)
        setRole(m.role)
        setImage(m.image)
        setBio(m.bio ?? "")
        setLinkedin(m.linkedin ?? "")
        setTwitter(m.twitter ?? "")
        setGithub(m.github ?? "")
        setOrder(String(m.order))
        setIsActive(m.isActive)
      } catch {
        toast.error("Could not load member")
        router.push("/admin/team")
      } finally {
        setLoading(false)
      }
    })()
  }, [id, router])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!image.trim()) {
      toast.error("Add a portrait image")
      return
    }
    setPending(true)
    try {
      const res = await adminFetch(`/api/team/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          role,
          image,
          bio: bio || null,
          linkedin: linkedin || null,
          twitter: twitter || null,
          github: github || null,
          order: parseInt(order, 10) || 0,
          isActive,
        }),
      })
      const err = await parseJsonResponse<{ error?: string }>(res, {})
      if (!res.ok) throw new Error(err.error || "Save failed")
      toast.success("Saved")
      router.push("/admin/team")
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
    <div className="max-w-xl space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 gap-1">
        <Link href="/admin/team">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Edit member</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input value={role} onChange={(e) => setRole(e.target.value)} required />
            </div>
            <ImagePicker
              label="Portrait photo"
              hint="Square or near-square photos look best on the team page."
              value={image}
              onChange={setImage}
            />
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>LinkedIn</Label>
                <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Twitter</Label>
                <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>GitHub</Label>
                <Input value={github} onChange={(e) => setGithub(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Order</Label>
              <Input type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} id="act" />
              <Label htmlFor="act">Active</Label>
            </div>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Save"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
