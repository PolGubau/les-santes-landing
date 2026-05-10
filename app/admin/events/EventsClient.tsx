'use client'

import { useState, useTransition, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { cancelEvent, restoreEvent } from '../actions'

export interface EventRow {
  id: string
  title: string
  type: string
  category: string
  start_time: string
  end_time: string
  location_name: string | null
  is_cancelled: boolean
  cancelled_reason: string | null
}

const TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  cercavila:      { label: 'Cercavila',   color: 'bg-orange-100 text-orange-700 border-orange-200' },
  correfoc:       { label: 'Correfoc',    color: 'bg-red-100 text-red-700 border-red-200' },
  concert:        { label: 'Concert',     color: 'bg-violet-100 text-violet-700 border-violet-200' },
  sardanes:       { label: 'Sardanes',    color: 'bg-blue-100 text-blue-700 border-blue-200' },
  castellera:     { label: 'Castellera',  color: 'bg-amber-100 text-amber-700 border-amber-200' },
  gegants:        { label: 'Gegants',     color: 'bg-teal-100 text-teal-700 border-teal-200' },
  havaneres:      { label: 'Havaneres',   color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  exposicio:      { label: 'Exposició',   color: 'bg-slate-100 text-slate-600 border-slate-200' },
  espectacle:     { label: 'Espectacle',  color: 'bg-pink-100 text-pink-700 border-pink-200' },
  missa:          { label: 'Missa',       color: 'bg-stone-100 text-stone-600 border-stone-200' },
  focsartificials:{ label: 'Focs',        color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  cursa:          { label: 'Cursa',       color: 'bg-green-100 text-green-700 border-green-200' },
  jocs:           { label: 'Jocs',        color: 'bg-lime-100 text-lime-700 border-lime-200' },
  contes:         { label: 'Contes',      color: 'bg-purple-100 text-purple-700 border-purple-200' },
  barram:         { label: 'Barram',      color: 'bg-amber-100 text-amber-800 border-amber-200' },
  altres:         { label: 'Altres',      color: 'bg-gray-100 text-gray-600 border-gray-200' },
}

const QUICK_REASONS = ['Pluja', 'Suspès per l\'organització', 'Aforament complet', 'Motius tècnics']

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString('ca-ES', {
    timeZone: 'Europe/Madrid',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('ca-ES', {
    timeZone: 'Europe/Madrid',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getDayKey(iso: string) {
  return new Date(iso).toLocaleDateString('ca-ES', {
    timeZone: 'Europe/Madrid',
    day: '2-digit',
    month: '2-digit',
  })
}

export function EventsClient({ events }: { events: EventRow[] }) {
  const [search, setSearch] = useState('')
  const [cancelingId, setCancelingId] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [isPending, startTransition] = useTransition()

  const active = useMemo(() => events.filter((e) => !e.is_cancelled), [events])
  const cancelled = useMemo(() => events.filter((e) => e.is_cancelled), [events])

  const days = useMemo(() => {
    const seen = new Set<string>()
    const result: { key: string; label: string }[] = []
    for (const e of active) {
      const key = getDayKey(e.start_time)
      if (!seen.has(key)) {
        seen.add(key)
        result.push({ key, label: formatDay(e.start_time) })
      }
    }
    return result
  }, [active])

  function filterEvents(list: EventRow[], day?: string) {
    return list.filter((e) => {
      const matchSearch = e.title.toLowerCase().includes(search.toLowerCase())
      const matchDay = !day || getDayKey(e.start_time) === day
      return matchSearch && matchDay
    })
  }

  function handleCancel(id: string) {
    if (!reason.trim()) return
    startTransition(async () => {
      await cancelEvent(id, reason)
      setCancelingId(null)
      setReason('')
    })
  }

  function handleRestore(id: string) {
    startTransition(async () => {
      await restoreEvent(id)
    })
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total" value={events.length} />
        <StatCard label="Actius" value={active.length} color="text-green-600" />
        <StatCard label="Cancel·lats" value={cancelled.length} color={cancelled.length > 0 ? 'text-destructive' : undefined} />
      </div>

      {/* Search */}
      <Input
        placeholder="Cercar per títol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {/* Day tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4 h-auto flex-wrap gap-1">
          <TabsTrigger value="all">Tots ({filterEvents(active).length})</TabsTrigger>
          {days.map((d) => (
            <TabsTrigger key={d.key} value={d.key}>
              {d.label} ({filterEvents(active, d.key).length})
            </TabsTrigger>
          ))}
          {cancelled.length > 0 && (
            <TabsTrigger value="cancelled" className="text-destructive">
              Cancel·lats ({cancelled.length})
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="all">
          <EventList events={filterEvents(active)} cancelingId={cancelingId} reason={reason} isPending={isPending}
            onStartCancel={setCancelingId} onReasonChange={setReason} onQuickReason={setReason}
            onConfirmCancel={handleCancel} onCancelAbort={() => { setCancelingId(null); setReason('') }}
            onRestore={handleRestore}
          />
        </TabsContent>

        {days.map((d) => (
          <TabsContent key={d.key} value={d.key}>
            <EventList events={filterEvents(active, d.key)} cancelingId={cancelingId} reason={reason} isPending={isPending}
              onStartCancel={setCancelingId} onReasonChange={setReason} onQuickReason={setReason}
              onConfirmCancel={handleCancel} onCancelAbort={() => { setCancelingId(null); setReason('') }}
              onRestore={handleRestore}
            />
          </TabsContent>
        ))}

        <TabsContent value="cancelled">
          <EventList events={filterEvents(cancelled)} cancelingId={null} reason="" isPending={isPending}
            onStartCancel={() => {}} onReasonChange={() => {}} onQuickReason={() => {}}
            onConfirmCancel={() => {}} onCancelAbort={() => {}} onRestore={handleRestore}
            showRestore
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-1 text-3xl font-bold tabular-nums ${color ?? 'text-foreground'}`}>{value}</p>
    </div>
  )
}

interface EventListProps {
  events: EventRow[]
  cancelingId: string | null
  reason: string
  isPending: boolean
  showRestore?: boolean
  onStartCancel: (id: string) => void
  onReasonChange: (v: string) => void
  onQuickReason: (v: string) => void
  onConfirmCancel: (id: string) => void
  onCancelAbort: () => void
  onRestore: (id: string) => void
}

function EventList({ events, cancelingId, reason, isPending, showRestore,
  onStartCancel, onReasonChange, onQuickReason, onConfirmCancel, onCancelAbort, onRestore,
}: EventListProps) {
  if (events.length === 0)
    return <p className="py-12 text-center text-sm text-muted-foreground">Cap event trobat.</p>

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 w-36">Hora</th>
            <th className="px-4 py-3">Títol</th>
            <th className="px-4 py-3 w-32 hidden md:table-cell">Lloc</th>
            <th className="px-4 py-3 w-24">Acció</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {events.map((event) => {
            const type = TYPE_CONFIG[event.type] ?? { label: event.type, color: 'bg-gray-100 text-gray-600 border-gray-200' }
            const isCanceling = cancelingId === event.id

            return (
              <>
                <tr key={event.id} className={`transition-colors hover:bg-muted/30 ${isCanceling ? 'bg-destructive/5' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium tabular-nums">{formatTime(event.start_time)}</div>
                    <div className="text-xs text-muted-foreground">{formatDay(event.start_time)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${type.color}`}>
                        {type.label}
                      </span>
                      <span className={`font-medium ${event.is_cancelled ? 'line-through text-muted-foreground' : ''}`}>
                        {event.title}
                      </span>
                    </div>
                    {event.cancelled_reason && (
                      <p className="mt-0.5 text-xs text-destructive">{event.cancelled_reason}</p>
                    )}
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-muted-foreground md:table-cell">
                    {event.location_name ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    {showRestore ? (
                      <Button size="xs" variant="outline" disabled={isPending}
                        onClick={() => onRestore(event.id)}>
                        Restaurar
                      </Button>
                    ) : (
                      <Button size="xs" variant="destructive" disabled={isPending}
                        onClick={() => onStartCancel(event.id)}>
                        Cancel·lar
                      </Button>
                    )}
                  </td>
                </tr>
                {isCanceling && (
                  <tr key={`${event.id}-cancel`} className="bg-destructive/5">
                    <td colSpan={4} className="px-4 pb-4 pt-2">
                      <p className="mb-2 text-xs font-semibold text-destructive">
                        Motiu de la cancel·lació — <span className="font-normal">{event.title}</span>
                      </p>
                      <div className="mb-2 flex flex-wrap gap-1">
                        {QUICK_REASONS.map((r) => (
                          <button key={r} type="button"
                            onClick={() => onQuickReason(r)}
                            className={`rounded-full border px-3 py-1 text-xs transition-colors hover:bg-muted ${reason === r ? 'border-destructive bg-destructive/10 text-destructive' : 'border-border text-muted-foreground'}`}>
                            {r}
                          </button>
                        ))}
                      </div>
                      <Textarea
                        value={reason}
                        onChange={(e) => onReasonChange(e.target.value)}
                        placeholder="O escriu un motiu personalitzat..."
                        className="mb-3 min-h-[60px] text-sm"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive" disabled={!reason.trim() || isPending}
                          onClick={() => onConfirmCancel(event.id)}>
                          Confirmar cancel·lació
                        </Button>
                        <Button size="sm" variant="outline" onClick={onCancelAbort}>
                          Enrere
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
