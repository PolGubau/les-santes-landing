import { createClient } from '@/lib/supabase/server'
import { logout } from './actions'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export const metadata = { title: 'Admin — Les Santes' }

const FESTIVAL_ID = process.env.FESTIVAL_ID ?? 'les-santes-2026'

const NAV_LINKS = [
  { href: '/admin/events', label: 'Esdeveniments' },
  { href: '/admin/announcements', label: 'Avisos' },
]

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
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold tracking-tight">
                Les Santes
              </span>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {FESTIVAL_ID}
              </Badge>
            </div>

            <Separator orientation="vertical" className="h-5" />

            <nav className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{user.email}</span>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Sortir
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  )
}
