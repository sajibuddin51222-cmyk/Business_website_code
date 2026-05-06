"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const onLoginPage = pathname === "/admin/login"
  const [allowed, setAllowed] = useState(onLoginPage)

  useEffect(() => {
    if (onLoginPage) {
      setAllowed(true)
      return
    }
    let cancelled = false
    fetch("/api/admin/auth/me", { credentials: "include" })
      .then((r) => {
        if (cancelled) return
        if (r.ok) setAllowed(true)
        else router.replace("/admin/login")
      })
      .catch(() => {
        if (!cancelled) router.replace("/admin/login")
      })
    return () => {
      cancelled = true
    }
  }, [onLoginPage, router])

  if (onLoginPage) return <>{children}</>
  if (!allowed)
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  return <>{children}</>
}
