import { createAdminClient } from '@/lib/supabase/server'
import { AnalyticsClient } from './AnalyticsClient'
import { type AnalyticsSummary, RANGES, type RangeKey } from './types'

const FESTIVAL_ID = process.env.FESTIVAL_ID ?? 'les-santes-2026'

interface PageProps {
  searchParams: Promise<{ range?: string }>
}

function resolveRange(raw: string | undefined): RangeKey {
  const found = RANGES.find((r) => r.key === raw)
  return (found?.key ?? '7d') as RangeKey
}

export default async function AnalyticsPage({ searchParams }: PageProps) {
  const { range: rangeParam } = await searchParams
  const range = resolveRange(rangeParam)
  const since = new Date(Date.now() - RANGES.find((r) => r.key === range)!.ms)

  const admin = await createAdminClient()
  const { data, error } = await admin.rpc('get_analytics_summary', {
    p_festival_id: FESTIVAL_ID,
    p_since: since.toISOString(),
  })

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
        Error carregant analítiques: {error.message}
      </div>
    )
  }

  const summary = (data ?? {
    totals: {
      total_events: 0,
      unique_installs: 0,
      unique_sessions: 0,
      app_opens: 0,
      event_views: 0,
      favorites_added: 0,
      favorites_removed: 0,
      onboarding_started: 0,
      onboarding_completed: 0,
    },
    app_opens_by_day: [],
    nudges: [],
    top_events: [],
    recent: [],
  }) as AnalyticsSummary

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Analítiques</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Comportament d&apos;ús de {FESTIVAL_ID}
        </p>
      </div>
      <AnalyticsClient summary={summary} range={range} />
    </div>
  )
}
