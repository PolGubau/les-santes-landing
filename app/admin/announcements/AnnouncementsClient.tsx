'use client'

import { useState, useTransition } from 'react'
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

const SEVERITY_CONFIG = {
  info: { label: 'Informació', icon: 'ℹ️', color: 'border-blue-200 bg-blue-50', badge: 'bg-blue-100 text-blue-700' },
  warning: { label: 'Avís', icon: '⚠️', color: 'border-yellow-200 bg-yellow-50', badge: 'bg-yellow-100 text-yellow-700' },
  critical: { label: 'Crític', icon: '🚨', color: 'border-red-200 bg-red-50', badge: 'bg-red-100 text-red-700' },
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
  const [severity, setSeverity] = useState<string>('info')
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
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <StatPill label="Actius" count={active.length} color="bg-green-100 text-green-700" />
          <StatPill label="Inactius" count={inactive.length} color="bg-muted text-muted-foreground" />
        </div>
        <Button onClick={() => setShowForm((v) => !v)} variant={showForm ? 'outline' : 'default'} size="sm">
          {showForm ? 'Cancel·lar' : '+ Nou avís'}
        </Button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-semibold">Nou avís</h2>
          <form action={handleCreate} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Títol *</Label>
                <Input id="title" name="title" placeholder="Ex: Canvi d'hora" required />
              </div>
              <div className="space-y-2">
                <Label>Gravetat</Label>
                <Select value={severity} onValueChange={(v) => v && setSeverity(v)} name="severity">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">ℹ️ Informació</SelectItem>
                    <SelectItem value="warning">⚠️ Avís</SelectItem>
                    <SelectItem value="critical">🚨 Crític</SelectItem>
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
            return (
              <div key={a.id} className={`flex items-start justify-between gap-4 rounded-2xl border p-4 ${cfg.color}`}>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${cfg.badge}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                    {a.event_id && (
                      <span className="rounded-full bg-white/70 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        {a.event_id}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">{formatDate(a.created_at)}</span>
                  </div>
                  <p className="font-medium">{a.title}</p>
                  {a.message && <p className="text-sm text-muted-foreground">{a.message}</p>}
                </div>
                <Button
                  size="xs"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => handleDeactivate(a.id)}
                  className="shrink-0 bg-white/70"
                >
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
