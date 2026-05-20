'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { StarIcon } from '@phosphor-icons/react'

interface Feedback {
  id: string
  rating: number
  type: 'bug' | 'suggestion' | 'general'
  message: string | null
  tags: string[]
  context: any
  app_version: string | null
  platform: string | null
  locale: string | null
  created_at: string
}

const dateFormatter = new Intl.DateTimeFormat('ca-ES', {
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
})

export function FeedbackClient({ feedback }: { feedback: Feedback[] }) {
  if (feedback.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 text-center">
        <p className="text-muted-foreground">Encara no hi ha cap feedback.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {feedback.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    weight={i < item.rating ? 'fill' : 'regular'}
                    className={i < item.rating ? 'text-yellow-500' : 'text-muted-foreground/30'}
                    size={16}
                  />
                ))}
              </div>
              <Badge variant={item.type === 'bug' ? 'destructive' : 'secondary'}>
                {item.type === 'bug'
                  ? 'Error'
                  : item.type === 'suggestion'
                    ? 'Suggeriment'
                    : 'General'}
              </Badge>
            </div>
            <time className="text-xs text-muted-foreground">
              {dateFormatter.format(new Date(item.created_at))}
            </time>
          </CardHeader>
          <CardContent>
            {item.message ? (
              <p className="text-sm leading-relaxed">{item.message}</p>
            ) : (
              <p className="text-xs italic text-muted-foreground">Sense missatge</p>
            )}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="h-auto px-1.5 py-0 text-[10px]"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4 border-t pt-4 text-[10px] text-muted-foreground">
              {item.app_version && <span>Versió: {item.app_version}</span>}
              {item.platform && <span>Plataforma: {item.platform}</span>}
              {item.context?.route && <span>Ruta: {item.context.route}</span>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
