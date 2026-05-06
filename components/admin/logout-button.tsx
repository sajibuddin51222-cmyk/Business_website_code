"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    try {
      const res = await fetch("/api/admin/auth/logout", { method: "POST" })
      if (!res.ok) throw new Error("Logout failed")
      toast.success("Signed out")
      router.push("/admin/login")
      router.refresh()
    } catch {
      toast.error("Could not sign out")
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
      Sign out
    </Button>
  )
}
