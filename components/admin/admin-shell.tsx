"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderKanban,
  Layers,
  FileText,
  Sparkles,
  Phone,
  Link2,
  Info,
  Users,
  Inbox,
  ChevronRight,
} from "lucide-react"
import { LogoutButton } from "@/components/admin/logout-button"

type NavItem = { href: string; label: string; icon: React.ElementType }

const groups: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/projects", label: "Portfolio projects", icon: FolderKanban },
      { href: "/admin/services", label: "Services", icon: Layers },
      { href: "/admin/pages", label: "CMS pages", icon: FileText },
    ],
  },
  {
    title: "Site",
    items: [
      { href: "/admin/settings", label: "Hero & stats", icon: Sparkles },
      { href: "/admin/contact", label: "Contact & social", icon: Phone },
      { href: "/admin/footer", label: "Footer links", icon: Link2 },
      { href: "/admin/about", label: "About section", icon: Info },
    ],
  },
  {
    title: "People & leads",
    items: [
      { href: "/admin/team", label: "Team", icon: Users },
      { href: "/admin/inquiries", label: "Form inquiries", icon: Inbox },
    ],
  },
]

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0 opacity-90" />
      <span className="truncate">{item.label}</span>
      {active && <ChevronRight className="ml-auto h-4 w-4 opacity-70" />}
    </Link>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col lg:flex-row">
      <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-border/80 bg-card/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-card/85">
        <div className="sticky top-0 flex max-h-screen flex-col gap-6 p-4 lg:h-screen lg:overflow-y-auto">
          <div className="flex items-center justify-between gap-2 px-1 lg:flex-col lg:items-stretch">
            <Link
              href="/admin"
              className="font-semibold tracking-tight text-lg lg:border-b lg:border-border lg:pb-4"
            >
              FusionByte CMS
            </Link>
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors lg:w-full lg:rounded-md lg:border lg:border-border/80 lg:px-3 lg:py-2 lg:text-center"
            >
              View live site
            </Link>
          </div>

          <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-6 lg:flex-nowrap">
            {groups.map((group) => (
              <div key={group.title} className="space-y-1 min-w-[140px] lg:min-w-0 flex-1 lg:flex-none">
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.title}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active =
                      item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname === item.href || pathname.startsWith(`${item.href}/`)
                    return <NavLink key={item.href} item={item} active={active} />
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto hidden lg:block border-t border-border pt-4 space-y-3">
            <LogoutButton />
            <p className="text-[11px] text-muted-foreground px-1 leading-relaxed">
              Signed-in editors can update public pages, footer, hero, team, and portfolio data.
            </p>
          </div>
        </div>
        <div className="flex justify-center border-t border-border p-4 lg:hidden">
          <LogoutButton />
        </div>
      </aside>

      <div className="flex-1 min-w-0 overflow-x-hidden bg-gradient-to-b from-background via-background to-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-8 lg:px-10">{children}</div>
      </div>
    </div>
  )
}
