import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AdminNav, AdminSignOutButton } from './AdminNav'

export const metadata = { title: 'Admin — Les Santes' }

const FESTIVAL_ID = process.env.FESTIVAL_ID ?? 'les-santes-2026'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-muted/30">
      {user && (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2.5 sm:gap-6 sm:px-6 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-sm font-semibold tracking-tight">
                Les Santes
              </span>
              <Badge variant="secondary" className="hidden font-mono text-[10px] sm:inline-flex">
                {FESTIVAL_ID}
              </Badge>
            </div>

            <Separator orientation="vertical" className="hidden h-5 sm:block" />

            <AdminNav />

            <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
              <span className="hidden max-w-[18ch] truncate text-xs text-muted-foreground md:inline">
                {user.email}
              </span>
              <AdminSignOutButton />
            </div>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  )
}
