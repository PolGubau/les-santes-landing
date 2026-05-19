'use client'

import { useState, useTransition } from 'react'
import {
  EyeSlashIcon,
  type Icon as PhosphorIcon,
  InfoIcon,
  PlusIcon,
  SirenIcon,
  WarningIcon,
  XIcon,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createAnnouncement, deactivateAnnouncement } from '../actions'

export interface AnnouncementRow {
  id: string
  title: string
  message: string | null
  severity: 'info' | 'warning' | 'critical'
  event_id: string | null
  is_active: boolean
  created_at: string
}

type Severity = AnnouncementRow['severity']

const SEVERITY_CONFIG: Record<Severity, {
  label: string
  Icon: PhosphorIcon
  card: string
  badge: string
  iconColor: string
}> = {
  info: {
    label: 'Informació',
    Icon: InfoIcon,
    card: 'border-blue-500/30 bg-blue-500/5',
    badge: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  warning: {
    label: 'Avís',
    Icon: WarningIcon,
    card: 'border-yellow-500/30 bg-yellow-500/5',
    badge: 'bg-yellow-500/15 text-yellow-800 dark:text-yellow-300',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  critical: {
    label: 'Crític',
    Icon: SirenIcon,
    card: 'border-red-500/40 bg-red-500/5',
    badge: 'bg-red-500/15 text-red-700 dark:text-red-300',
    iconColor: 'text-red-600 dark:text-red-400',
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('ca-ES', {
    timeZone: 'Europe/Madrid',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function AnnouncementsClient({
  festivalId,
  active,
  inactive,
}: {
  festivalId: string
  active: AnnouncementRow[]
  inactive: AnnouncementRow[]
}) {
  const [severity, setSeverity] = useState<Severity>('info')
  const [isPending, startTransition] = useTransition()
  const [showForm, setShowForm] = useState(false)

  function handleCreate(formData: FormData) {
    formData.set('festival_id', festivalId)
    formData.set('severity', severity)
    startTransition(async () => {
      await createAnnouncement(formData)
      setShowForm(false)
      setSeverity('info')
    })
  }

  function handleDeactivate(id: string) {
    startTransition(async () => {
      await deactivateAnnouncement(id)
    })
  }

  return (
    <div className="space-y-6">
      {/* Header actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <StatPill label="Actius" count={active.length} color="bg-green-100 text-green-700" />
          <StatPill label="Inactius" count={inactive.length} color="bg-muted text-muted-foreground" />
        </div>
        <Button
          onClick={() => setShowForm((v) => !v)}
          variant={showForm ? 'outline' : 'default'}
          size="sm"
          className="gap-1.5"
        >
          {showForm ? (
            <>
              <XIcon className="size-3.5" weight="bold" aria-hidden />
              Cancel·lar
            </>
          ) : (
            <>
              <PlusIcon className="size-3.5" weight="bold" aria-hidden />
              Nou avís
            </>
          )}
        </Button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="rounded-2xl border bg-card p-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <h2 className="mb-4 font-semibold">Nou avís</h2>
          <form action={handleCreate} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Títol *</Label>
                <Input id="title" name="title" placeholder="Ex: Canvi d'hora" required />
              </div>
              <div className="space-y-2">
                <Label>Gravetat</Label>
                <Select
                  value={severity}
                  onValueChange={(v) => v && setSeverity(v as Severity)}
                  name="severity"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(SEVERITY_CONFIG) as [Severity, typeof SEVERITY_CONFIG[Severity]][]).map(
                      ([key, { Icon, label, iconColor }]) => (
                        <SelectItem key={key} value={key}>
                          <Icon className={`size-4 ${iconColor}`} weight="fill" aria-hidden /> {label}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Detall</Label>
              <Textarea id="message" name="message" placeholder="Descripció detallada (opcional)" rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event_id">ID de l&apos;event relacionat</Label>
              <Input id="event_id" name="event_id" placeholder="Ex: ls25-042 (opcional)" className="font-mono" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isPending}>
                Publicar avís
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel·lar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Active announcements */}
      {active.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-muted/30 py-12 text-center text-sm text-muted-foreground">
          Cap avís actiu en aquest moment
        </div>
      ) : (
        <div className="space-y-3">
          {active.map((a) => {
            const cfg = SEVERITY_CONFIG[a.severity]
            const Icon = cfg.Icon
            return (
              <div
                key={a.id}
                className={`flex flex-col gap-3 rounded-2xl border p-4 transition-all duration-200 hover:shadow-sm animate-in fade-in slide-in-from-bottom-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4 ${cfg.card}`}
              >
                <div className="flex flex-1 items-start gap-3">
                  <Icon
                    className={`mt-0.5 size-5 shrink-0 ${cfg.iconColor}`}
                    weight="fill"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${cfg.badge}`}>
                        {cfg.label}
                      </span>
                      {a.event_id && (
                        <span className="rounded-full bg-background/70 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                          {a.event_id}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">{formatDate(a.created_at)}</span>
                    </div>
                    <p className="font-medium wrap-break-word">{a.title}</p>
                    {a.message && <p className="text-sm text-muted-foreground wrap-break-word">{a.message}</p>}
                  </div>
                </div>
                <Button
                  size="xs"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => handleDeactivate(a.id)}
                  className="shrink-0 gap-1.5 self-end bg-background/70 sm:self-auto"
                >
                  <EyeSlashIcon className="size-3.5" aria-hidden />
                  Desactivar
                </Button>
              </div>
            )
          })}
        </div>
      )}

      {/* Inactive (collapsed) */}
      {inactive.length > 0 && (
        <details className="group">
          <summary className="cursor-pointer list-none">
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Veure historial ({inactive.length} inactius)
            </span>
          </summary>
          <div className="mt-3 space-y-2">
            {inactive.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl border bg-muted/20 px-4 py-3 opacity-60">
                <div>
                  <p className="text-sm font-medium line-through">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(a.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  )
}

function StatPill({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${color}`}>
      <span className="tabular-nums font-bold">{count}</span>
      {label}
    </span>
  )
}
