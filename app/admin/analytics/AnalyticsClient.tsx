import { Separator } from '@/components/ui/separator'
import { AppOpensChart } from './AppOpensChart'
import { Kpi } from './Kpi'
import { NudgesTable } from './NudgesTable'
import { RangeSelector } from './RangeSelector'
import { RecentEventsList, TopEventsList } from './RecentList'
import { RANGES, type AnalyticsSummary, type RangeKey } from './types'

interface AnalyticsClientProps {
  summary: AnalyticsSummary
  range: RangeKey
}

export function AnalyticsClient({ summary, range }: AnalyticsClientProps) {
  const { totals, app_opens_by_day, nudges, top_events, recent } = summary

  const onboardingRate = totals.onboarding_started
    ? Math.round((totals.onboarding_completed / totals.onboarding_started) * 100)
    : 0

  return (
    <div className="flex flex-col gap-6">
      <RangeSelector active={range} />

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Kpi label="Esdeveniments totals" value={totals.total_events} />
        <Kpi label="Instal·lacions úniques" value={totals.unique_installs} />
        <Kpi label="Sessions" value={totals.unique_sessions} />
        <Kpi label="Obertures d'app" value={totals.app_opens} />
        <Kpi label="Vistes d'acte" value={totals.event_views} />
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Favorits afegits" value={totals.favorites_added} tone="positive" />
        <Kpi label="Favorits eliminats" value={totals.favorites_removed} tone="muted" />
        <Kpi label="Onboarding iniciat" value={totals.onboarding_started} />
        <Kpi
          label="Onboarding completat"
          value={totals.onboarding_completed}
          hint={`${onboardingRate}% del iniciat`}
          tone={onboardingRate >= 60 ? 'positive' : 'muted'}
        />
      </section>

      <AppOpensChart data={app_opens_by_day} />
      <NudgesTable data={nudges} />

      <section className="grid gap-6 lg:grid-cols-2">
        <TopEventsList data={top_events} />
        <RecentEventsList data={recent} />
      </section>

      <Separator />
      <p className="text-xs text-muted-foreground">
        Període: <strong>{RANGES.find((r) => r.key === range)?.label}</strong> · Generat al servidor
      </p>
    </div>
  )
}
