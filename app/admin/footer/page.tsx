"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function AdminFooter() {
  const [links, setLinks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    column: "Services",
    order: 0,
    isActive: true
  })

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const res = await fetch("/api/footer-links")
      const data = await res.json()
      setLinks(data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/footer-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast.success("Footer link created successfully!")
        setFormData({ title: "", url: "", column: "Services", order: 0, isActive: true })
        fetchLinks()
      } else {
        toast.error("Failed to save link")
      }
    } catch(e) {
      toast.error("Error saving link")
    }
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin w-8 h-8" /></div>

  // Basic layout just to add new links
  return (
    <div className="p-8 max-w-6xl mx-auto text-foreground">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Footer Links</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Form */}
        <div className="lg:col-span-1 bg-card border border-border p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-6">Add New Link</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border p-2 rounded-lg" placeholder="e.g. Privacy Policy" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL / Slug</label>
              <input required value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full bg-background border border-border p-2 rounded-lg" placeholder="e.g. /privacy-policy" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Column Category</label>
              <select value={formData.column} onChange={e => setFormData({...formData, column: e.target.value})} className="w-full bg-background border border-border p-2 rounded-lg">
                <option value="Services">Services</option>
                <option value="Company">Company</option>
                <option value="Support">Support</option>
                <option value="Legal">Legal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Order Index</label>
              <input type="number" required value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-background border border-border p-2 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} id="isActive" />
              <label htmlFor="isActive" className="text-sm">Is Active</label>
            </div>
            <Button type="submit" className="w-full">Create Link</Button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="grid gap-4">
            {links.map(link => (
              <div key={link.id} className="bg-card border border-border p-5 rounded-2xl flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{link.title} <span className="text-xs text-muted-foreground ml-2">({link.column} - Order: {link.order})</span></h3>
                  <code className="text-sm text-primary">{link.url}</code>
                  <span className={`ml-3 text-xs px-2 py-1 rounded-full ${link.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {link.isActive ? "Active" : "Draft"}
                  </span>
                </div>
              </div>
            ))}
            {links.length === 0 && <div className="text-center p-8 text-muted-foreground">No footer links created yet.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
