"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Edit, Trash2, Plus, X } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

import { ImagePicker } from "@/components/admin/image-picker"

export default function AdminTeam() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)

  const emptyForm = {
    name: "", role: "", image: "", bio: "",
    linkedin: "", twitter: "", github: "", order: 0, isActive: true
  }
  const [formData, setFormData] = useState(emptyForm)

  useEffect(() => { fetchMembers() }, [])

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/team")
      const data = await res.json()
      setMembers(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editing ? "PUT" : "POST"
      const url = editing ? `/api/team/${editing.id}` : "/api/team"
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        toast.success(`Team member ${editing ? 'updated' : 'added'} successfully!`)
        resetForm()
        fetchMembers()
      } else { toast.error("Failed to save") }
    } catch (e) { toast.error("Error saving team member") }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return
    try {
      await fetch(`/api/team/${id}`, { method: "DELETE" })
      toast.success("Deleted successfully")
      fetchMembers()
    } catch (e) { toast.error("Error deleting") }
  }

  const handleEdit = (m: any) => {
    setEditing(m)
    setShowForm(true)
    setFormData({
      name: m.name, role: m.role, image: m.image, bio: m.bio || "",
      linkedin: m.linkedin || "", twitter: m.twitter || "", github: m.github || "",
      order: m.order, isActive: m.isActive
    })
  }

  const resetForm = () => {
    setEditing(null)
    setShowForm(false)
    setFormData(emptyForm)
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin w-8 h-8" /></div>

  return (
    <div className="p-8 max-w-6xl mx-auto text-foreground">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Team Members</h1>
        <Button onClick={() => { setShowForm(!showForm); setEditing(null); setFormData(emptyForm) }}>
          {showForm ? <><X className="w-4 h-4 mr-2" /> Cancel</> : <><Plus className="w-4 h-4 mr-2" /> Add Member</>}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-border p-6 rounded-2xl mb-8">
          <h2 className="text-xl font-bold mb-6">{editing ? "Edit Member" : "Add New Team Member"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-background border border-border p-2.5 rounded-lg" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role / Designation *</label>
              <input required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-background border border-border p-2.5 rounded-lg" placeholder="CEO & Founder" />
            </div>
            <div className="md:col-span-2">
              <ImagePicker 
                label="Profile Photo *"
                value={formData.image}
                onChange={(val) => setFormData({ ...formData, image: val })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Short Bio</label>
              <textarea rows={3} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-background border border-border p-2.5 rounded-lg" placeholder="A short description about this person..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
              <input value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-background border border-border p-2.5 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Twitter URL</label>
              <input value={formData.twitter} onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full bg-background border border-border p-2.5 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub URL</label>
              <input value={formData.github} onChange={e => setFormData({ ...formData, github: e.target.value })}
                className="w-full bg-background border border-border p-2.5 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Display Order</label>
              <input type="number" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full bg-background border border-border p-2.5 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} id="isActive" />
              <label htmlFor="isActive" className="text-sm">Active (visible on website)</label>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">{editing ? "Update Member" : "Add Member"}</Button>
            </div>
          </form>
        </div>
      )}

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map(m => (
          <div key={m.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="relative w-full h-48">
              <Image src={m.image} alt={m.name} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg">{m.name}</h3>
              <p className="text-sm text-primary font-medium mb-2">{m.role}</p>
              {m.bio && <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{m.bio}</p>}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(m)}>
                  <Edit className="w-3 h-3 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(m.id)}>
                  <Trash2 className="w-3 h-3 mr-1" /> Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <div className="col-span-full text-center p-12 text-muted-foreground bg-card border border-border rounded-2xl">
            No team members yet. Click "Add Member" above to get started.
          </div>
        )}
      </div>
    </div>
  )
}
