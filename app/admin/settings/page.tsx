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
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { ImagePicker } from "@/components/admin/image-picker"

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [heroTitle, setHeroTitle] = useState("")
  const [heroBadgeSubtitle, setHeroBadgeSubtitle] = useState("")
  const [heroDescription, setHeroDescription] = useState("")
  const [heroBgImage, setHeroBgImage] = useState("")
  const [processTitle, setProcessTitle] = useState("")
  const [processDescription, setProcessDescription] = useState("")
  const [statsId, setStatsId] = useState("")
  const [projectsCompleted, setProjectsCompleted] = useState("")
  const [happyClients, setHappyClients] = useState("")
  const [teamMembers, setTeamMembers] = useState("")
  const [yearsExperience, setYearsExperience] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const [sRes, stRes] = await Promise.all([
          adminFetch("/api/settings"),
          adminFetch("/api/stats"),
        ])
        const s = await sRes.json()
        const st = await stRes.json()
        if (sRes.ok && s) {
          setHeroTitle(s.heroTitle ?? "")
          setHeroBadgeSubtitle(s.heroBadgeSubtitle ?? "")
          setHeroDescription(s.heroDescription ?? "")
          setHeroBgImage(s.heroBgImage ?? "")
          setProcessTitle(s.processTitle ?? "")
          setProcessDescription(s.processDescription ?? "")
        }
        if (stRes.ok && st && typeof st === "object" && "id" in st && st.id) {
          setStatsId(String(st.id))
          setProjectsCompleted(String(st.projectsCompleted ?? ""))
          setHappyClients(String(st.happyClients ?? ""))
          setTeamMembers(String(st.teamMembers ?? ""))
          setYearsExperience(String(st.yearsExperience ?? ""))
        }
      } catch {
        toast.error("Could not load settings")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const siteRes = await adminFetch("/api/settings", {
        method: "PUT",
        body: JSON.stringify({
          heroTitle,
          heroBadgeSubtitle: heroBadgeSubtitle.trim() || null,
          heroDescription,
          heroBgImage: heroBgImage || null,
          processTitle,
          processDescription,
        }),
      })
      if (!siteRes.ok) throw new Error("Hero settings failed")

      if (statsId) {
        const statsRes = await adminFetch("/api/stats", {
          method: "PUT",
          body: JSON.stringify({
            id: statsId,
            projectsCompleted,
            happyClients,
            teamMembers,
            yearsExperience,
          }),
        })
        if (!statsRes.ok) throw new Error("Stats update failed")
      }

      toast.success("Saved — homepage hero and stat counters updated.")
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Hero & company stats</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Controls the homepage hero, “How we work” header, and animated stat strip.
        </p>
      </div>

      <form onSubmit={save} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hero</CardTitle>
            <CardDescription>Above-the-fold headline and background.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ht">Hero title</Label>
              <Input
                id="ht"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hbs">Hero badge — second line</Label>
              <Input
                id="hbs"
                value={heroBadgeSubtitle}
                onChange={(e) => setHeroBadgeSubtitle(e.target.value)}
                placeholder="Shown under “TURNING IDEAS INTO DIGITAL REALITY” (leave empty for default)"
              />
              <p className="text-xs text-muted-foreground">
                Short sentence under the badge slogan. If empty, a default line is used on the homepage.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hd">Hero description</Label>
              <Textarea
                id="hd"
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
            <ImagePicker
              label="Hero background image"
              hint="Upload a wide landscape image, pick from your media library, or paste a CDN / stock photo URL."
              value={heroBgImage}
              onChange={setHeroBgImage}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How we work</CardTitle>
            <CardDescription>Section title above the process steps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pt">Section title</Label>
              <Input
                id="pt"
                value={processTitle}
                onChange={(e) => setProcessTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pd">Section description</Label>
              <Textarea
                id="pd"
                value={processDescription}
                onChange={(e) => setProcessDescription(e.target.value)}
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stat strip</CardTitle>
            <CardDescription>Numbers shown beside the hero (e.g. 500+, 10+).</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Projects delivered</Label>
              <Input value={projectsCompleted} onChange={(e) => setProjectsCompleted(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Happy clients</Label>
              <Input value={happyClients} onChange={(e) => setHappyClients(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Team members (stat)</Label>
              <Input value={teamMembers} onChange={(e) => setTeamMembers(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Years experience</Label>
              <Input value={yearsExperience} onChange={(e) => setYearsExperience(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={saving} className="min-w-[140px]">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </div>
  )
}
