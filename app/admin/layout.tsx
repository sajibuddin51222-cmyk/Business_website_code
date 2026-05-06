import { AdminShell } from '@/components/admin/admin-shell'
import { RequireAdmin } from '@/components/admin/require-admin'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminShell>
      <RequireAdmin>{children}</RequireAdmin>
    </AdminShell>
  )
}
