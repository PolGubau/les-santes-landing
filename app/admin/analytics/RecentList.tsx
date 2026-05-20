import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { RecentEvent, TopEvent, TopFavorite } from './types'

export function TopEventsList({ data }: { data: TopEvent[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top esdeveniments vistos</CardTitle>
        <CardDescription>Per nombre de vistes</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sense dades.</p>
        ) : (
          <ol className="flex flex-col gap-2">
            {data.map((e, i) => (
              <li key={e.event_id} className="flex items-center gap-3 text-sm">
                <span className="w-5 font-mono text-xs text-muted-foreground">{i + 1}</span>
                <Link
                  href="/admin/events"
                  className="flex-1 truncate font-mono text-xs hover:underline"
                  title={e.event_id}
                >
                  {e.event_id}
                </Link>
                <span className="font-mono text-xs">{e.views}</span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}

export function TopFavoritesList({ data }: { data: TopFavorite[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top esdeveniments favorits</CardTitle>
        <CardDescription>Per favorits nets (afegits − eliminats)</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sense dades.</p>
        ) : (
          <ol className="flex flex-col gap-2">
            {data.map((e, i) => (
              <li key={e.event_id} className="flex items-center gap-3 text-sm">
                <span className="w-5 font-mono text-xs text-muted-foreground">{i + 1}</span>
                <Link
                  href="/admin/events"
                  className="flex-1 truncate text-xs hover:underline"
                  title={e.event_id}
                >
                  {e.title ?? e.event_id}
                </Link>
                <span
                  className="font-mono text-[10px] text-muted-foreground"
                  title={`${e.added} afegits · ${e.removed} eliminats`}
                >
                  +{e.added}
                  {e.removed > 0 ? ` / −${e.removed}` : ''}
                </span>
                <span className="w-8 text-right font-mono text-xs font-medium">{e.net}</span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Pick the most relevant property to display alongside an event so the recent
 * list reads as a useful timeline ("event_view · ls26-001") instead of opaque
 * event names. Falls back to a compact JSON preview when no key matches.
 */
function describeProperties(properties: Record<string, unknown> | null): string | null {
  if (!properties) return null
  const known = ['event_id', 'screen', 'nudge_id', 'last_step', 'step'] as const
  for (const key of known) {
    const value = properties[key]
    if (typeof value === 'string' && value.length > 0) return value
  }
  const entries = Object.entries(properties).filter(([, v]) => v != null)
  if (entries.length === 0) return null
  const [k, v] = entries[0]
  return `${k}=${String(v)}`
}

export function RecentEventsList({ data }: { data: RecentEvent[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Esdeveniments recents</CardTitle>
        <CardDescription>Últims 50</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sense dades.</p>
        ) : (
          <ul className="flex max-h-[420px] flex-col gap-1.5 overflow-y-auto pr-1">
            {data.map((r) => {
              const detail = describeProperties(r.properties)
              return (
                <li key={r.id} className="flex items-baseline gap-2 text-xs">
                  <span className="w-16 shrink-0 font-mono text-muted-foreground">
                    {new Date(r.created_at).toLocaleTimeString('ca-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {r.event_name}
                  </Badge>
                  {detail ? (
                    <span className="truncate font-mono text-[10px]" title={detail}>
                      {detail}
                    </span>
                  ) : null}
                  {r.platform ? (
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                      {r.platform}
                    </span>
                  ) : null}
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
