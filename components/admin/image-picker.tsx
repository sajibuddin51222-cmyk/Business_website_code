"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Upload, Image as ImageIcon, Link as LinkIcon, FolderOpen, X, Check, Plus } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface ImagePickerProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function ImagePicker({ value, onChange, label }: ImagePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [library, setLibrary] = useState<{ name: string, url: string }[]>([])
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const fetchLibrary = async () => {
    setIsLoadingLibrary(true)
    try {
      const res = await fetch("/api/admin/images")
      const data = await res.json()
      setLibrary(data.images || [])
    } catch (e) {
      toast.error("Failed to load image library")
    } finally {
      setIsLoadingLibrary(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (data.success) {
        onChange(data.url)
        setIsOpen(false)
        toast.success("Image uploaded")
      } else {
        throw new Error(data.error)
      }
    } catch (e: any) {
      toast.error(e.message || "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      
      <div className="flex flex-col gap-4">
        {/* Preview Area */}
        <div className="relative aspect-video w-full max-w-sm rounded-xl border-2 border-dashed border-muted-foreground/25 overflow-hidden bg-muted/50 flex items-center justify-center group">
          {value ? (
            <>
              <Image 
                src={value} 
                alt="Selected" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => onChange("")}
                  type="button"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon className="w-8 h-8 opacity-50" />
              <span className="text-sm">No image selected</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open)
          if (open) fetchLibrary()
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-fit" type="button">
              <FolderOpen className="w-4 h-4 mr-2" />
              {value ? "Change Image" : "Select Image"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Select Image</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="upload" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload">
                  <Upload className="w-4 h-4 mr-2" /> Upload
                </TabsTrigger>
                <TabsTrigger value="library">
                  <FolderOpen className="w-4 h-4 mr-2" /> Library
                </TabsTrigger>
                <TabsTrigger value="link">
                  <LinkIcon className="w-4 h-4 mr-2" /> Link
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="p-10 text-center border-2 border-dashed rounded-xl mt-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">SVG, PNG, JPG or WebP</p>
                  </div>
                  <Input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    id="image-upload" 
                    onChange={handleUpload}
                    disabled={isUploading}
                  />
                  <Button asChild disabled={isUploading}>
                    <label htmlFor="image-upload">
                      {isUploading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      Choose File
                    </label>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="library" className="mt-4">
                {isLoadingLibrary ? (
                  <div className="h-64 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : library.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                    <p>Your image library is empty</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-1">
                    {library.map((img) => (
                      <div 
                        key={img.url}
                        className={`relative aspect-square rounded-lg border-2 overflow-hidden cursor-pointer hover:border-primary transition-all ${value === img.url ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => {
                          onChange(img.url)
                          setIsOpen(false)
                        }}
                      >
                        <Image src={img.url} alt={img.name} fill className="object-cover" />
                        {value === img.url && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Check className="w-8 h-8 text-primary bg-background rounded-full p-1" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="link" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="https://example.com/image.jpg" 
                      value={value.startsWith("http") ? value : ""}
                      onChange={(e) => onChange(e.target.value)}
                    />
                    <Button onClick={() => setIsOpen(false)}>Done</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
