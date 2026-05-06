import Link from "next/link"
import { redirect } from "next/navigation"
import { verifyAuth } from "@/lib/backend/auth.service"
import { getAdminDashboardStats } from "@/lib/backend/stats.service"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function AdminDashboardPage() {
  const user = await verifyAuth()
  if (!user) {
    redirect("/admin/login")
  }

  let stats: Awaited<ReturnType<typeof getAdminDashboardStats>> | null = null
  let dbError: string | null = null
  try {
    stats = await getAdminDashboardStats()
  } catch {
    dbError =
      "Could not load dashboard stats. Check DATABASE_URL and that the database is reachable."
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Signed in as{" "}
          <span className="font-medium text-foreground">{String(user.email ?? "")}</span>
        </p>
      </div>

      {dbError ? (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Database</CardTitle>
            <CardDescription>{dbError}</CardDescription>
          </CardHeader>
        </Card>
      ) : stats ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Projects" value={stats.projects} />
          <StatCard label="Services" value={stats.services} />
          <StatCard label="Team" value={stats.teamMembers} />
          <StatCard label="Requests" value={stats.requests} />
          <StatCard label="Pages" value={stats.pages} />
          <StatCard label="Footer links" value={stats.footerLinks} />
          <StatCard label="About points" value={stats.aboutPoints} />
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickCard href="/admin/settings" title="Hero & stats" desc="Homepage hero copy and counter strip." />
        <QuickCard href="/admin/contact" title="Contact & social" desc="Email, phone, address, social URLs." />
        <QuickCard href="/admin/pages" title="CMS pages" desc="Legal, careers, blog, FAQ, docs." />
        <QuickCard href="/admin/footer" title="Footer links" desc="Three-column footer navigation." />
        <QuickCard href="/admin/about" title="About section" desc="Homepage “why choose us” cards." />
        <QuickCard href="/admin/projects" title="Portfolio" desc="Projects grid & detail pages." />
        <QuickCard href="/admin/services" title="Services" desc="Service cards on the homepage." />
        <QuickCard href="/admin/team" title="Team" desc="/our-team roster." />
        <QuickCard href="/admin/inquiries" title="Inquiries" desc="Lead form submissions." />
      </div>
    </div>
  )
}

function QuickCard({
  href,
  title,
  desc,
}: {
  href: string
  title: string
  desc: string
}) {
  return (
    <Card className="transition-colors hover:border-primary/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-xs">{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href} className="text-sm font-medium text-primary underline underline-offset-4">
          Open →
        </Link>
      </CardContent>
    </Card>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl tabular-nums">{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}
