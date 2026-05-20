import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { NudgeRow } from './types'

export function NudgesTable({ data }: { data: NudgeRow[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Embut de micro-nudges</CardTitle>
        <CardDescription>Mostrats → completats / descartats</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">Encara no s&apos;han mostrat nudges.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="py-2 pr-4">Nudge</th>
                  <th className="py-2 pr-4">Mostrats</th>
                  <th className="py-2 pr-4">Completats</th>
                  <th className="py-2 pr-4">Descartats</th>
                  <th className="py-2 pr-4">Taxa</th>
                </tr>
              </thead>
              <tbody>
                {data.map((n) => {
                  const rate = n.shown ? Math.round((n.completed / n.shown) * 100) : 0
                  return (
                    <tr key={n.nudge_id} className="border-t">
                      <td className="py-2 pr-4 font-mono text-xs">{n.nudge_id}</td>
                      <td className="py-2 pr-4 font-mono">{n.shown}</td>
                      <td className="py-2 pr-4 font-mono">{n.completed}</td>
                      <td className="py-2 pr-4 font-mono text-muted-foreground">{n.dismissed}</td>
                      <td className="py-2 pr-4 font-mono">{rate}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
