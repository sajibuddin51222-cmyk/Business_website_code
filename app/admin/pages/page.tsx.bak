"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function AdminPages() {
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    isActive: true
  })

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/pages")
      const data = await res.json()
      setPages(data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editing ? "PUT" : "POST"
      const url = editing ? `/api/pages/${formData.slug}` : "/api/pages"
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast.success(`Page ${editing ? 'updated' : 'created'} successfully!`)
        setEditing(null)
        setFormData({ title: "", slug: "", content: "", isActive: true })
        fetchPages()
      } else {
        toast.error("Failed to save page")
      }
    } catch(e) {
      toast.error("Error saving page")
    }
  }

  const handleDelete = async (slug: string) => {
    if(!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/pages/${slug}`, { method: "DELETE" })
      toast.success("Page deleted")
      fetchPages()
    } catch(e) {
      toast.error("Error deleting page")
    }
  }

  const handleEdit = (page: any) => {
    setEditing(page)
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      isActive: page.isActive
    })
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin w-8 h-8" /></div>

  return (
    <div className="p-8 max-w-6xl mx-auto text-foreground">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Pages</h1>
        {editing && (
          <Button variant="outline" onClick={() => {
            setEditing(null)
            setFormData({ title: "", slug: "", content: "", isActive: true })
          }}>
            Cancel Edit
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Form */}
        <div className="lg:col-span-1 bg-card border border-border p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-6">{editing ? "Edit Page" : "Create New Page"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border p-2 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug (URL)</label>
              <input required disabled={!!editing} value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-background border border-border p-2 rounded-lg" placeholder="privacy-policy" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content (Markdown / HTML)</label>
              <textarea required rows={10} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-background border border-border p-2 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} id="isActive" />
              <label htmlFor="isActive" className="text-sm">Is Active</label>
            </div>
            <Button type="submit" className="w-full">{editing ? "Update Page" : "Create Page"}</Button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="grid gap-4">
            {pages.map(page => (
              <div key={page.id} className="bg-card border border-border p-5 rounded-2xl flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{page.title}</h3>
                  <code className="text-sm text-primary">/{page.slug}</code>
                  <span className={`ml-3 text-xs px-2 py-1 rounded-full ${page.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {page.isActive ? "Active" : "Draft"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => handleEdit(page)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(page.slug)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {pages.length === 0 && <div className="text-center p-8 text-muted-foreground">No pages created yet.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
