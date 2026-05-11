'use client'

import { useState, useTransition, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { cancelEvent, restoreEvent, createEvent, updateEvent } from '../actions'

export interface RoutePoint { lat: number; lng: number }

export interface EventRow {
  id: string
  title: string
  type: string
  category: string
  kind: string
  icon_name: string
  short_description: string
  start_time: string
  end_time: string
  location_name: string | null
  location_lat: number | null
  location_lng: number | null
  route: RoutePoint[] | null
  is_cancelled: boolean
  cancelled_reason: string | null
}

// ── Preset locations (same as mock.ts LOC+NAME) ─────────────────────────────
export const PRESET_LOCATIONS: { key: string; name: string; lat: number; lng: number }[] = [
  { key: 'ajuntament', name: 'Ajuntament de Mataró', lat: 41.5397828848703, lng: 2.444718276586209 },
  { key: 'basilica', name: 'Basílica de Santa Maria', lat: 41.540979, lng: 2.446309 },
  { key: 'plSantaAnna', name: 'Plaça de Santa Anna', lat: 41.537687, lng: 2.444657 },
  { key: 'plSantaMaria', name: 'Plaça de Santa Maria', lat: 41.540778, lng: 2.446272 },
  { key: 'plCuba', name: 'Plaça de Cuba', lat: 41.537373, lng: 2.440892 },
  { key: 'canXammar', name: 'Plaça de Can Xammar', lat: 41.538561, lng: 2.445205 },
  { key: 'cPujol', name: "Carrer d'en Pujol", lat: 41.538239, lng: 2.444588 },
  { key: 'parcCentral', name: 'Nou Parc Central', lat: 41.542709, lng: 2.437911 },
  { key: 'espaiFiral', name: 'Espai Firal del Nou Parc Central', lat: 41.543581, lng: 2.438094 },
  { key: 'llarCabanellas', name: 'Llar Cabanellas', lat: 41.545915, lng: 2.445812 },
  { key: 'callao', name: 'Passeig del Callao', lat: 41.534321, lng: 2.447741 },
  { key: 'maritim', name: 'Passeig Marítim', lat: 41.534831, lng: 2.453907 },
  { key: 'port', name: 'Port de Mataró', lat: 41.532508, lng: 2.447331 },
  { key: 'varador', name: 'Platja del Varador', lat: 41.535934, lng: 2.453779 },
  { key: 'preso', name: 'M|A|C Presó', lat: 41.541775, lng: 2.443381 },
  { key: 'monumental', name: 'Teatre Monumental', lat: 41.543811, lng: 2.442289 },
  { key: 'biblioteca', name: 'Biblioteca Pompeu Fabra', lat: 41.538524, lng: 2.446017 },
  { key: 'residencia', name: 'Pati de la Residència Sant Josep', lat: 41.535542, lng: 2.441028 },
  { key: 'esmandies', name: 'Pati de les Esmandies', lat: 41.538021, lng: 2.439495 },
  { key: 'cafeNou', name: 'Pati del Cafè Nou', lat: 41.539245, lng: 2.443169 },
  { key: 'escorxador', name: "Jardins de l'Antic Escorxador", lat: 41.536011, lng: 2.440008 },
  { key: 'destilleria', name: 'La Destil·leria', lat: 41.537861, lng: 2.448898 },
  { key: 'foment', name: 'Foment Mataroní', lat: 41.540063, lng: 2.445875 },
  { key: 'canSerra', name: 'Can Serra. Museu de Mataró', lat: 41.540522, lng: 2.446517 },
  { key: 'alianca', name: "Casal L'Aliança", lat: 41.539286, lng: 2.443571 },
  { key: 'escolaVistaAlegre', name: 'Escola Vista Alegre', lat: 41.558453, lng: 2.437627 },
  { key: 'marMediterrania', name: 'Institut Escola Mar Mediterrània', lat: 41.554121, lng: 2.431667 },
  { key: 'canMarfa', name: 'Can Marfà', lat: 41.541762, lng: 2.449796 },
]

/** Parse GeoJSON (geojson.io) or raw RoutePoint[] into RoutePoint[] */
function parseGeoJSON(raw: string): RoutePoint[] {
  const parsed = JSON.parse(raw)
  // Raw array: [{lat, lng}, ...]
  if (Array.isArray(parsed)) return parsed as RoutePoint[]
  // GeoJSON FeatureCollection
  if (parsed.type === 'FeatureCollection') {
    const feature = parsed.features?.find((f: { geometry?: { type: string } }) => f.geometry?.type === 'LineString')
    if (feature) return feature.geometry.coordinates.map(([lng, lat]: [number, number]) => ({ lat, lng }))
  }
  // GeoJSON Feature
  if (parsed.type === 'Feature' && parsed.geometry?.type === 'LineString') {
    return parsed.geometry.coordinates.map(([lng, lat]: [number, number]) => ({ lat, lng }))
  }
  // GeoJSON LineString
  if (parsed.type === 'LineString') {
    return parsed.coordinates.map(([lng, lat]: [number, number]) => ({ lat, lng }))
  }
  throw new Error('Format no reconegut. Enganxa un LineString de geojson.io o un array [{lat,lng}].')
}

const TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  cercavila: { label: 'Cercavila', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  correfoc: { label: 'Correfoc', color: 'bg-red-100 text-red-700 border-red-200' },
  concert: { label: 'Concert', color: 'bg-violet-100 text-violet-700 border-violet-200' },
  sardanes: { label: 'Sardanes', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  castellera: { label: 'Castellera', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  gegants: { label: 'Gegants', color: 'bg-teal-100 text-teal-700 border-teal-200' },
  havaneres: { label: 'Havaneres', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  exposicio: { label: 'Exposició', color: 'bg-slate-100 text-slate-600 border-slate-200' },
  espectacle: { label: 'Espectacle', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  missa: { label: 'Missa', color: 'bg-stone-100 text-stone-600 border-stone-200' },
  focsartificials: { label: 'Focs', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  cursa: { label: 'Cursa', color: 'bg-green-100 text-green-700 border-green-200' },
  jocs: { label: 'Jocs', color: 'bg-lime-100 text-lime-700 border-lime-200' },
  contes: { label: 'Contes', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  barram: { label: 'Barram', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  altres: { label: 'Altres', color: 'bg-gray-100 text-gray-600 border-gray-200' },
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

// ── Icon catalogue (Lucide icon names) ─────────────────────────────────────
const ICON_OPTIONS = [
  { value: 'music', label: '🎵 Música' },
  { value: 'users', label: '👥 Gent' },
  { value: 'zap', label: '⚡ Espectacle' },
  { value: 'map-pin', label: '📍 Lloc' },
  { value: 'flag', label: '🚩 Cursa' },
  { value: 'heart', label: '❤️ Tradicional' },
  { value: 'star', label: '⭐ Destacat' },
  { value: 'flame', label: '🔥 Foc' },
  { value: 'person-standing', label: '🚶 Cercavila' },
  { value: 'book-open', label: '📖 Cultural' },
  { value: 'gamepad-2', label: '🎮 Jocs' },
  { value: 'church', label: '⛪ Missa' },
]

// ── Form types & helpers ────────────────────────────────────────────────────
interface EventFormData {
  title: string
  type: string
  category: string
  kind: string
  icon_name: string
  short_description: string
  start_time: string
  end_time: string
  location_name: string
  location_lat: string
  location_lng: string
  route_json: string  // raw textarea for mobile route (GeoJSON or [{lat,lng}] array)
}

/** Display ISO timestamps as Europe/Madrid local time (consistent regardless of browser TZ) */
function toDateTimeLocal(iso: string): string {
  return new Intl.DateTimeFormat('sv', {
    timeZone: 'Europe/Madrid',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(new Date(iso)).replace(' ', 'T').slice(0, 16)
}

/** Treat a datetime-local string as Europe/Madrid and return UTC ISO */
function madridLocalToISO(local: string): string {
  // Parse as UTC, then find the Madrid offset at that moment, then adjust
  const asUTC = new Date(local + 'Z')
  const madridStr = new Intl.DateTimeFormat('sv', {
    timeZone: 'Europe/Madrid',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(asUTC).replace(' ', 'T').slice(0, 16)
  const diff = asUTC.getTime() - new Date(madridStr + 'Z').getTime()
  return new Date(asUTC.getTime() - diff).toISOString()
}

function emptyForm(): EventFormData {
  return {
    title: '', type: 'concert', category: 'cultural', kind: 'static',
    icon_name: 'music', short_description: '', start_time: '', end_time: '',
    location_name: '', location_lat: '', location_lng: '', route_json: '',
  }
}

function rowToForm(row: EventRow): EventFormData {
  return {
    title: row.title, type: row.type, category: row.category, kind: row.kind,
    icon_name: row.icon_name, short_description: row.short_description,
    start_time: toDateTimeLocal(row.start_time),
    end_time: toDateTimeLocal(row.end_time),
    location_name: row.location_name ?? '',
    location_lat: row.location_lat?.toString() ?? '',
    location_lng: row.location_lng?.toString() ?? '',
    route_json: row.route ? JSON.stringify(row.route, null, 2) : '',
  }
}

export function EventsClient({ events }: { events: EventRow[] }) {
  const [inputValue, setInputValue] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const id = setTimeout(() => setSearch(inputValue), 250)
    return () => clearTimeout(id)
  }, [inputValue])
  const [selectedDay, setSelectedDay] = useState<string>('all')
  const [cancelingId, setCancelingId] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [isPending, startTransition] = useTransition()
  const [panelEvent, setPanelEvent] = useState<EventRow | 'new' | null>(null)
  const [panelError, setPanelError] = useState<string | null>(null)

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

  function handlePanelSubmit(data: EventFormData) {
    setPanelError(null)
    // Parse route if mobile
    let route: RoutePoint[] | null = null
    if (data.kind === 'mobile') {
      if (!data.route_json.trim()) { setPanelError("Cal una ruta per a events mòbils."); return }
      try { route = parseGeoJSON(data.route_json) }
      catch (e) { setPanelError((e as Error).message); return }
      if (route.length < 2) { setPanelError("La ruta necessita com a mínim 2 punts."); return }
    }
    startTransition(async () => {
      const payload = {
        title: data.title,
        type: data.type,
        category: data.category,
        kind: data.kind,
        icon_name: data.icon_name,
        short_description: data.short_description,
        start_time: madridLocalToISO(data.start_time),
        end_time: madridLocalToISO(data.end_time),
        location_name: data.location_name || undefined,
        location_lat: data.location_lat ? parseFloat(data.location_lat) : undefined,
        location_lng: data.location_lng ? parseFloat(data.location_lng) : undefined,
        route,
      }
      const res = panelEvent === 'new'
        ? await createEvent(payload)
        : panelEvent ? await updateEvent(panelEvent.id, payload) : undefined
      if (res?.error) { setPanelError(res.error); return }
      setPanelEvent(null)
      setPanelError(null)
    })
  }

  const sharedListProps = {
    cancelingId, reason, isPending,
    onStartCancel: setCancelingId,
    onReasonChange: setReason,
    onQuickReason: setReason,
    onConfirmCancel: handleCancel,
    onCancelAbort: () => { setCancelingId(null); setReason('') },
    onRestore: handleRestore,
    onEdit: setPanelEvent,
  }

  return (
    <div className="space-y-6">
      {/* Header: stats + new-event button */}
      <div className="grid flex-1 md:grid-cols-3 gap-4">
        <StatCard label="Total" value={events.length} />
        <StatCard label="Actius" value={active.length} color="text-green-600" />
        <StatCard label="Cancel·lats" value={cancelled.length} color={cancelled.length > 0 ? 'text-destructive' : undefined} />
      </div>

      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        {/* Search */}
        <Input
          placeholder="Cercar per títol..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button onClick={() => setPanelEvent('new')} className="shrink-0">
            + Nou event
          </Button>
        </div>

      </header>

      {/* Day filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <DayChip
          label="Tots"
          count={filterEvents(active).length}
          active={selectedDay === 'all'}
          onClick={() => setSelectedDay('all')}
        />
        {days.map((d) => (
          <DayChip
            key={d.key}
            label={d.label}
            count={filterEvents(active, d.key).length}
            active={selectedDay === d.key}
            onClick={() => setSelectedDay(d.key)}
          />
        ))}
        {cancelled.length > 0 && (
          <DayChip
            label="Cancel·lats"
            count={cancelled.length}
            active={selectedDay === 'cancelled'}
            onClick={() => setSelectedDay('cancelled')}
            destructive
          />
        )}
      </div>

      {/* Content panel */}
      <Tabs value={selectedDay} onValueChange={setSelectedDay}>
        <TabsContent value="all">
          <EventList events={filterEvents(active)} {...sharedListProps} />
        </TabsContent>

        {days.map((d) => (
          <TabsContent key={d.key} value={d.key}>
            <EventList events={filterEvents(active, d.key)} {...sharedListProps} />
          </TabsContent>
        ))}

        <TabsContent value="cancelled">
          <EventList
            events={filterEvents(cancelled)}
            cancelingId={null} reason="" isPending={isPending}
            onStartCancel={() => { }} onReasonChange={() => { }} onQuickReason={() => { }}
            onConfirmCancel={() => { }} onCancelAbort={() => { }}
            onRestore={handleRestore} onEdit={setPanelEvent}
            showRestore
          />
        </TabsContent>
      </Tabs>

      {/* Create / edit slide-over */}
      {panelEvent !== null && (
        <EventFormPanel
          event={panelEvent === 'new' ? null : panelEvent}
          isPending={isPending}
          error={panelError}
          onClose={() => { setPanelEvent(null); setPanelError(null) }}
          onSubmit={handlePanelSubmit}
        />
      )}
    </div>
  )
}

// ── EventFormPanel (slide-over) ─────────────────────────────────────────────
interface EventFormPanelProps {
  event: EventRow | null
  isPending: boolean
  error: string | null
  onClose: () => void
  onSubmit: (data: EventFormData) => void
}

function EventFormPanel({ event, isPending, error, onClose, onSubmit }: EventFormPanelProps) {
  const [form, setForm] = useState<EventFormData>(event ? rowToForm(event) : emptyForm())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true))
    return () => cancelAnimationFrame(id)
  }, [])

  function handleClose() {
    setOpen(false)
    setTimeout(onClose, 300)
  }

  function set(key: keyof EventFormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      {/* Panel */}
      <div className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col bg-background shadow-2xl transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">{event ? 'Editar event' : 'Nou event'}</h2>
            {event && <p className="mt-0.5 font-mono text-xs text-muted-foreground">{event.id}</p>}
          </div>
          <button type="button" onClick={handleClose} aria-label="Tancar"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            ✕
          </button>
        </div>

        {/* Scrollable form */}
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form) }} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-8 overflow-y-auto p-6">

            {/* Basic info */}
            <section className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Informació bàsica</h3>
              <div className="space-y-2">
                <Label htmlFor="f-title">Títol *</Label>
                <Input id="f-title" value={form.title} onChange={(e) => set('title', e.target.value)}
                  placeholder="Ex: Concert de havaneres" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Tipus *</Label>
                  <Select value={form.type} onValueChange={(v) => v && set('type', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(TYPE_CONFIG).map(([k, cfg]) => (
                        <SelectItem key={k} value={k}>{cfg.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Categoria *</Label>
                  <Select value={form.category} onValueChange={(v) => v && set('category', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="familiar">Familiar</SelectItem>
                      <SelectItem value="nocturn">Nocturn</SelectItem>
                      <SelectItem value="tradicional">Tradicional</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Moviment</Label>
                  <Select value={form.kind} onValueChange={(v) => v && set('kind', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static">📍 Lloc fix</SelectItem>
                      <SelectItem value="mobile">🚶 Mòbil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Icona</Label>
                  <Select value={form.icon_name} onValueChange={(v) => v && set('icon_name', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Descripció</h3>
              <div className="space-y-2">
                <Label htmlFor="f-desc">Descripció curta *</Label>
                <Textarea id="f-desc" value={form.short_description} rows={3} required
                  onChange={(e) => set('short_description', e.target.value)}
                  placeholder="Una frase que descriu l'event..." />
              </div>
            </section>

            {/* Schedule */}
            <section className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Horari</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="f-start">Inici *</Label>
                  <Input id="f-start" type="datetime-local" value={form.start_time} required
                    onChange={(e) => set('start_time', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="f-end">Final *</Label>
                  <Input id="f-end" type="datetime-local" value={form.end_time} required
                    onChange={(e) => set('end_time', e.target.value)} />
                </div>
              </div>
            </section>

            {/* Location */}
            <section className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Localització</h3>

              {form.kind === 'static' ? (
                <>
                  {/* Preset selector */}
                  <div className="space-y-2">
                    <Label>Lloc predefinit</Label>
                    <Select
                      value={PRESET_LOCATIONS.find(p => p.lat.toString() === form.location_lat)?.key ?? ''}
                      onValueChange={(key) => {
                        const preset = PRESET_LOCATIONS.find(p => p.key === key)
                        if (!preset) return
                        setForm(prev => ({
                          ...prev,
                          location_name: preset.name,
                          location_lat: preset.lat.toString(),
                          location_lng: preset.lng.toString(),
                        }))
                      }}
                    >
                      <SelectTrigger><SelectValue placeholder="Selecciona un lloc…" /></SelectTrigger>
                      <SelectContent>
                        {PRESET_LOCATIONS.map(p => (
                          <SelectItem key={p.key} value={p.key}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Manual override */}
                  <div className="space-y-2">
                    <Label htmlFor="f-loc">Nom personalitzat</Label>
                    <Input id="f-loc" value={form.location_name} onChange={(e) => set('location_name', e.target.value)}
                      placeholder="Ex: Plaça de la Vila" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="f-lat">Latitud</Label>
                      <Input id="f-lat" type="number" step="any" value={form.location_lat}
                        onChange={(e) => set('location_lat', e.target.value)} placeholder="41.5678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="f-lng">Longitud</Label>
                      <Input id="f-lng" type="number" step="any" value={form.location_lng}
                        onChange={(e) => set('location_lng', e.target.value)} placeholder="2.4321" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="f-loc">Nom del lloc (opcional)</Label>
                    <Input id="f-loc" value={form.location_name} onChange={(e) => set('location_name', e.target.value)}
                      placeholder="Ex: Sortida des de l'Ajuntament" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="f-route">
                      Ruta *
                      {form.route_json.trim() && (() => {
                        try {
                          const pts = parseGeoJSON(form.route_json)
                          return <span className="ml-2 font-normal text-green-600">✓ {pts.length} punts</span>
                        } catch { return <span className="ml-2 font-normal text-destructive">Format invàlid</span> }
                      })()}
                    </Label>
                    <Textarea
                      id="f-route"
                      value={form.route_json}
                      onChange={(e) => set('route_json', e.target.value)}
                      rows={6}
                      className="font-mono text-xs"
                      placeholder={'Enganxa el GeoJSON de geojson.io (LineString)\no un array: [{\"lat\":41.53,\"lng\":2.44},...]'}
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Dibuixa la ruta a{' '}
                      <a href="https://geojson.io" target="_blank" rel="noopener noreferrer"
                        className="underline hover:text-foreground">geojson.io</a>
                      {' '}com a LineString i enganxa el JSON aquí.
                    </p>
                  </div>
                </>
              )}
            </section>

          </div>

          {/* Sticky footer */}
          <div className="shrink-0 border-t bg-background px-6 py-4 space-y-3">
            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            )}
            <div className="flex gap-3">
              <Button type="submit" disabled={isPending} className="flex-1">
                {isPending ? 'Desant…' : event ? 'Desar canvis' : 'Crear event'}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
                Cancel·lar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

// ── DayChip ─────────────────────────────────────────────────────────────────
function DayChip({ label, count, active, onClick, destructive }: {
  label: string
  count: number
  active: boolean
  onClick: () => void
  destructive?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors',
        active && !destructive && 'border-primary bg-primary text-primary-foreground',
        active && destructive && 'border-destructive bg-destructive text-destructive-foreground',
        !active && !destructive && 'border-border bg-background text-foreground hover:bg-muted',
        !active && destructive && 'border-destructive/40 bg-destructive/5 text-destructive hover:bg-destructive/10',
      ].filter(Boolean).join(' ')}
    >
      {label}
      <span className={[
        'rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
        active && !destructive && 'bg-primary-foreground/20 text-primary-foreground',
        active && destructive && 'bg-white/20 text-white',
        !active && 'bg-muted text-muted-foreground',
      ].filter(Boolean).join(' ')}>
        {count}
      </span>
    </button>
  )
}

// ── StatCard ────────────────────────────────────────────────────────────────
function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="rounded-2xl border bg-card px-5 py-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-1 text-3xl font-bold tabular-nums ${color ?? 'text-foreground'}`}>{value}</p>
    </div>
  )
}

// ── EventList ───────────────────────────────────────────────────────────────
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
  onEdit: (event: EventRow) => void
}

function EventList({ events, cancelingId, reason, isPending, showRestore,
  onStartCancel, onReasonChange, onQuickReason, onConfirmCancel, onCancelAbort, onRestore, onEdit,
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
            <th className="px-4 py-3 w-40">Accions</th>
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
                    <div className="flex items-center gap-2">
                      <Button size="xs" variant="outline" disabled={isPending}
                        onClick={() => onEdit(event)}>
                        Editar
                      </Button>
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
                    </div>
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
