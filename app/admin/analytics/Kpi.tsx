import { Card, CardContent } from '@/components/ui/card'

interface KpiProps {
  label: string
  value: number
  hint?: string
  tone?: 'positive' | 'muted'
}

export function Kpi({ label, value, hint, tone }: KpiProps) {
  const toneClass =
    tone === 'positive'
      ? 'text-emerald-600 dark:text-emerald-400'
      : tone === 'muted'
        ? 'text-muted-foreground'
        : ''
  return (
    <Card size="sm">
      <CardContent className="flex flex-col gap-1">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className={`font-heading text-2xl font-semibold tabular-nums ${toneClass}`}>
          {value.toLocaleString('ca-ES')}
        </span>
        {hint ? <span className="text-[11px] text-muted-foreground">{hint}</span> : null}
      </CardContent>
    </Card>
  )
}
