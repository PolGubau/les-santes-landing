'use client'

import Link from 'next/link'
import { RANGES, type RangeKey } from './types'

export function RangeSelector({ active }: { active: RangeKey }) {
  return (
    <nav className="inline-flex w-fit rounded-lg border bg-background p-0.5" aria-label="Període">
      {RANGES.map((r) => {
        const isActive = r.key === active
        return (
          <Link
            key={r.key}
            href={`/admin/analytics?range=${r.key}`}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'rounded-md px-3 py-1.5 text-xs font-medium transition-all',
              isActive
                ? 'bg-foreground text-background shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            ].join(' ')}
          >
            {r.label}
          </Link>
        )
      })}
    </nav>
  )
}
