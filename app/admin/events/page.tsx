import { createClient } from '@/lib/supabase/server'
import { EventsClient, type EventRow } from './EventsClient'

const FESTIVAL_ID = process.env.FESTIVAL_ID ?? 'les-santes-2026'

export default async function EventsPage() {
  const supabase = await createClient()

  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, type, category, kind, short_description, image_url, start_time, end_time, location_name, location_lat, location_lng, route, is_cancelled, cancelled_reason')
    .eq('festival_id', FESTIVAL_ID)
    .order('start_time', { ascending: true })

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
        Error carregant events: {error.message}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Esdeveniments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gestiona el programa de {FESTIVAL_ID}
        </p>
      </div>
      <EventsClient events={events as EventRow[]} />
    </div>
  )
}
