"use client"

import { useState, useEffect, useCallback, useRef, useId } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Loader2,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  FolderOpen,
  X,
  Check,
  Plus,
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { adminFetch } from "@/lib/admin-api"
import { cn } from "@/lib/utils"

function MediaPreview({ src, alt, className }: { src: string; alt: string; className?: string }) {
  if (!src.trim()) return null
  const pathOnly = src.split("?")[0] ?? ""
  const lower = pathOnly.toLowerCase()
  const useNative =
    lower.endsWith(".svg") ||
    lower.endsWith(".gif") ||
    lower.endsWith(".ico") ||
    src.startsWith("data:")
  if (useNative) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
        loading="lazy"
      />
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("object-cover", className)}
      sizes="(max-width: 560px) 100vw, 480px"
    />
  )
}

export interface ImagePickerProps {
  value: string
  onChange: (value: string) => void
  label?: string
  hint?: string
  /** When true, preview shows placeholder (for “append URL” flows). Resets visually while still calling onChange. */
  previewOnlyExternal?: boolean
}

export function ImagePicker({
  value,
  onChange,
  label,
  hint,
  previewOnlyExternal,
}: ImagePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [library, setLibrary] = useState<{ name: string; url: string }[]>([])
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [linkDraft, setLinkDraft] = useState("")
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const uploadInputId = useId()

  const displayUrl =
    previewOnlyExternal ? "" : value

  const fetchLibrary = useCallback(async () => {
    setIsLoadingLibrary(true)
    try {
      const res = await adminFetch("/api/admin/images")
      if (!res.ok) {
        if (res.status === 401) toast.error("Sign in to load the media library")
        throw new Error("library")
      }
      const data = await res.json()
      setLibrary(data.images || [])
    } catch {
      toast.error("Failed to load image library")
    } finally {
      setIsLoadingLibrary(false)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const v = value.trim()
    setLinkDraft(
      v === ""
        ? ""
        : /^https?:\/\//i.test(v) || v.startsWith("//") || v.startsWith("/")
          ? value
          : ""
    )
  }, [isOpen, value])

  const runUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Choose an image file (PNG, JPG, WebP, GIF, SVG, …)")
      return
    }
    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    try {
      const res = await adminFetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.success && data.url) {
        onChange(data.url)
        setIsOpen(false)
        toast.success("Image uploaded")
      } else {
        throw new Error(data.error || "Upload failed")
      }
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    await runUpload(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) void runUpload(file)
  }

  const applyLink = () => {
    const t = linkDraft.trim()
    if (!t) {
      toast.error("Enter a valid URL")
      return
    }
    if (!/^https?:\/\//i.test(t) && !t.startsWith("/")) {
      toast.error("Use a full https:// link or a site path like /uploads/…")
      return
    }
    onChange(t)
    setIsOpen(false)
    toast.success("Image URL applied")
  }

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      {hint && <p className="text-xs text-muted-foreground leading-relaxed">{hint}</p>}

      <div className="flex flex-col gap-3">
        <div
          className={cn(
            "relative aspect-[16/10] w-full max-w-md overflow-hidden rounded-xl border border-border/80 bg-muted/40 shadow-inner",
            "ring-offset-background"
          )}
        >
          {displayUrl ? (
            <>
              <MediaPreview src={displayUrl} alt="Selected" />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity hover:opacity-100">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => onChange("")}
                  className="shadow-lg"
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground">
              <div className="rounded-2xl border border-dashed border-primary/25 bg-primary/5 p-4">
                <ImageIcon className="mx-auto h-8 w-8 text-primary/60" />
              </div>
              <p className="text-sm font-medium">No image selected</p>
              <p className="text-xs text-muted-foreground max-w-[16rem]">
                Upload from your device, pick from the media library, or paste a URL (CDN, S3, Unsplash, etc.)
              </p>
            </div>
          )}
        </div>

        {value && (
          <Input
            readOnly
            className="font-mono text-xs h-8 text-muted-foreground"
            value={value}
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
        )}

        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open)
            if (open) void fetchLibrary()
          }}
        >
          <DialogTrigger asChild>
            <Button variant="outline" className="w-fit border-primary/20" type="button">
              <FolderOpen className="mr-2 h-4 w-4" />
              {value ? "Change image" : "Add image"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Image source</DialogTitle>
              <DialogDescription>
                Upload from this computer, choose a file you already uploaded, or paste an image URL from the web.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="upload" className="mt-2">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload" className="gap-1.5">
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Upload</span>
                </TabsTrigger>
                <TabsTrigger value="link" className="gap-1.5">
                  <LinkIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">URL</span>
                </TabsTrigger>
                <TabsTrigger value="library" className="gap-1.5">
                  <FolderOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Library</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-4 space-y-3">
                <div
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  className={cn(
                    "rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors",
                    dragOver
                      ? "border-primary bg-primary/10"
                      : "border-muted-foreground/25 bg-muted/30 hover:border-primary/40"
                  )}
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center gap-3">
                    <div className="rounded-full bg-primary/15 p-4">
                      <Upload className="h-9 w-9 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Drop an image here</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Or choose — JPG, PNG, WebP, GIF, SVG, AVIF (max 15&nbsp;MB)
                      </p>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*,.svg,.avif,.webp,.heic,.heif"
                      className="sr-only"
                      id={uploadInputId}
                      onChange={handleFileInput}
                      disabled={isUploading}
                      aria-label="Choose image file"
                    />
                    <Button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileRef.current?.click()}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading…
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" /> Choose file
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="link" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="img-url">Image URL</Label>
                  <Input
                    id="img-url"
                    placeholder="https://cdn.example.com/photo.webp"
                    value={linkDraft}
                    onChange={(e) => setLinkDraft(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Paste any HTTPS image link (your CDN, cloud storage, stock photo URL, etc.). Paths starting with{" "}
                    <code className="text-[11px]">/uploads/</code> work too.
                  </p>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setLinkDraft("")}>
                    Clear
                  </Button>
                  <Button type="button" onClick={applyLink}>
                    Use this URL
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="library" className="mt-4">
                {isLoadingLibrary ? (
                  <div className="flex h-56 items-center justify-center">
                    <Loader2 className="h-9 w-9 animate-spin text-primary" />
                  </div>
                ) : library.length === 0 ? (
                  <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-dashed text-muted-foreground">
                    <ImageIcon className="mb-3 h-14 w-14 opacity-15" />
                    <p className="font-medium">No uploads yet</p>
                    <p className="text-sm">Upload a file first — it will appear here.</p>
                  </div>
                ) : (
                  <div className="grid max-h-[380px] grid-cols-3 gap-3 overflow-y-auto p-1 sm:grid-cols-4">
                    {library.map((img) => (
                      <button
                        key={img.url}
                        type="button"
                        className={cn(
                          "relative aspect-square overflow-hidden rounded-xl border-2 transition-all",
                          value === img.url
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-transparent hover:border-primary/50"
                        )}
                        onClick={() => {
                          onChange(img.url)
                          setIsOpen(false)
                          toast.success("Image selected")
                        }}
                      >
                        <MediaPreview src={img.url} alt={img.name} />
                        {value === img.url && (
                          <div className="absolute inset-0 flex items-center justify-center bg-primary/25">
                            <Check className="h-10 w-10 rounded-full bg-background p-2 text-primary shadow-lg" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
