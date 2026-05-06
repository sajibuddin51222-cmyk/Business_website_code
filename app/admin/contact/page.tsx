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
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { parseJsonResponse } from "@/lib/utils"
import { DEFAULT_CONTACT_INFO } from "@/lib/public-defaults"

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [rowId, setRowId] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [twitter, setTwitter] = useState("")
  const [github, setGithub] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/contact")
        const data = await parseJsonResponse<
          typeof DEFAULT_CONTACT_INFO & { id?: string }
        >(res, { ...DEFAULT_CONTACT_INFO })
        setRowId((data as { id?: string }).id ?? "")
        setEmail(data.email)
        setPhone(data.phone)
        setAddress(data.address ?? "")
        setLinkedin(data.linkedin ?? "")
        setTwitter(data.twitter ?? "")
        setGithub(data.github ?? "")
      } catch {
        toast.error("Could not load contact")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        email,
        phone,
        address: address || null,
        linkedin: linkedin || null,
        twitter: twitter || null,
        github: github || null,
      }
      const res = rowId
        ? await adminFetch("/api/contact", {
            method: "PUT",
            body: JSON.stringify({ id: rowId, ...payload }),
          })
        : await adminFetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(payload),
          })
      const body = await parseJsonResponse<{ id?: string; error?: string }>(res, {})
      if (!res.ok) throw new Error(body.error || "Save failed")
      if (body.id) setRowId(body.id)
      toast.success("Contact & social links saved")
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Contact & social</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Shown in the contact section, footer icons, and structured data.
        </p>
      </div>

      <form onSubmit={save}>
        <Card>
          <CardHeader>
            <CardTitle>Public contact</CardTitle>
            <CardDescription>
              If the row has no id yet, save once — the API updates the first record.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Address</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>X / Twitter URL</Label>
              <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>GitHub URL</Label>
              <Input value={github} onChange={(e) => setGithub(e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <Button type="submit" className="mt-6" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </div>
  )
}
