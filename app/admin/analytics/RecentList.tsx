import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { RecentEvent, TopEvent } from './types'

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
            {data.map((r) => (
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
                {r.platform ? (
                  <span className="font-mono text-[10px] text-muted-foreground">{r.platform}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
