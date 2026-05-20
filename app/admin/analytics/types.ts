export type RangeKey = '24h' | '7d' | '30d'

export const RANGES: { key: RangeKey; label: string; ms: number }[] = [
  { key: '24h', label: 'Últimes 24h', ms: 24 * 60 * 60 * 1000 },
  { key: '7d', label: 'Últims 7 dies', ms: 7 * 24 * 60 * 60 * 1000 },
  { key: '30d', label: 'Últims 30 dies', ms: 30 * 24 * 60 * 60 * 1000 },
]

export interface AnalyticsTotals {
  total_events: number
  unique_installs: number
  unique_sessions: number
  app_opens: number
  event_views: number
  favorites_added: number
  favorites_removed: number
  onboarding_started: number
  onboarding_completed: number
}

export interface AppOpensDay {
  day: string
  count: number
  installs: number
}

export interface NudgeRow {
  nudge_id: string
  shown: number
  dismissed: number
  completed: number
}

export interface TopEvent {
  event_id: string
  views: number
}

export interface TopFavorite {
  event_id: string
  title: string | null
  added: number
  removed: number
  net: number
}

export interface RecentEvent {
  id: string
  event_name: string
  properties: Record<string, unknown> | null
  install_id: string | null
  platform: string | null
  app_version: string | null
  created_at: string
}

export interface AnalyticsSummary {
  totals: AnalyticsTotals
  app_opens_by_day: AppOpensDay[]
  nudges: NudgeRow[]
  top_events: TopEvent[]
  top_favorites: TopFavorite[]
  recent: RecentEvent[]
}
