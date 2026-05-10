import { createAdminClient } from '@/lib/supabase/server'
import { AnnouncementsClient, type AnnouncementRow } from './AnnouncementsClient'

const FESTIVAL_ID = process.env.FESTIVAL_ID ?? 'les-santes-2026'

export default async function AnnouncementsPage() {
  const admin = await createAdminClient()

  const { data: rows, error } = await admin
    .from('announcements')
    .select('*')
    .eq('festival_id', FESTIVAL_ID)
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
        Error carregant avisos: {error.message}
      </div>
    )
  }

  const announcements = rows as AnnouncementRow[]
  const active = announcements.filter((a) => a.is_active)
  const inactive = announcements.filter((a) => !a.is_active)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Avisos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Avisos d&apos;última hora visibles a l&apos;app en temps real
        </p>
      </div>
      <AnnouncementsClient festivalId={FESTIVAL_ID} active={active} inactive={inactive} />
    </div>
  )
}
