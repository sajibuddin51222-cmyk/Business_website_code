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
import { ImagePicker } from "@/components/admin/image-picker"

export default function NewTeamMemberPage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [image, setImage] = useState("/placeholder-user.jpg")
  const [bio, setBio] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [order, setOrder] = useState("1")
  const [isActive, setIsActive] = useState(true)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!image.trim()) {
      toast.error("Add a portrait image")
      return
    }
    setPending(true)
    try {
      const res = await adminFetch("/api/team", {
        method: "POST",
        body: JSON.stringify({
          name,
          role,
          image,
          bio: bio || null,
          linkedin: linkedin || null,
          order: parseInt(order, 10) || 0,
          isActive,
        }),
      })
      const err = await parseJsonResponse<{ error?: string }>(res, {})
      if (!res.ok) throw new Error(err.error || "Create failed")
      toast.success("Team member added")
      router.push("/admin/team")
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Create failed")
    } finally {
      setPending(false)
    }
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
          <CardTitle>New team member</CardTitle>
          <CardDescription>Square portrait works best (same ratio as placeholders).</CardDescription>
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
            <div className="space-y-2">
              <Label>LinkedIn (optional)</Label>
              <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Sort order</Label>
              <Input type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} id="act" />
              <Label htmlFor="act">Visible on /our-team</Label>
            </div>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
