import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { AppOpensDay } from './types'

export function AppOpensChart({ data }: { data: AppOpensDay[] }) {
  const max = Math.max(1, ...data.map((d) => d.count))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Obertures per dia</CardTitle>
        <CardDescription>
          Esdeveniments{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-[10px]">app_open</code> i
          instal·lacions úniques per dia
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sense dades en aquest període.</p>
        ) : (
          <ol className="flex flex-col gap-2">
            {data.map((d) => (
              <li key={d.day} className="flex items-center gap-3">
                <span className="w-20 font-mono text-xs text-muted-foreground">
                  {new Date(d.day).toLocaleDateString('ca-ES', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
                <div className="flex-1">
                  <div
                    className="h-2 rounded-full bg-foreground/80"
                    style={{ width: `${(d.count / max) * 100}%`, minWidth: '4px' }}
                  />
                </div>
                <span className="w-12 text-right font-mono text-xs">{d.count}</span>
                <span className="w-16 text-right font-mono text-[11px] text-muted-foreground">
                  {d.installs} inst.
                </span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}
