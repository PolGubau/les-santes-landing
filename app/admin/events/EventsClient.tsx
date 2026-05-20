'use client'

import {
  memo,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react'
import {
  ArrowCounterClockwiseIcon,
  CheckIcon,
  type Icon as PhosphorIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PencilSimpleIcon,
  PersonSimpleWalkIcon,
  PlusIcon,
  ProhibitIcon,
  WarningIcon,
  XIcon,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cancelEvent, restoreEvent, createEvent, updateEvent } from '../actions'
import { EventPreviewMap } from './EventPreviewMap'

export interface RoutePoint { lat: number; lng: number }

export interface EventRow {
  id: string
  title: string
  type: string
  category: string
  kind: string
  short_description: string
  start_time: string
  end_time: string
  image_url: string | null
  location_name: string | null
  location_lat: number | null
  location_lng: number | null
  route: RoutePoint[] | null
  is_cancelled: boolean
  cancelled_reason: string | null
  // Pre-calculated for performance
  dayKey?: string
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
  { key: 'biblioteca', name: 'Biblioteca Pompeu Fabra', lat: 41.53826088038736, lng: 2.4336906150875595 },
  { key: 'residencia', name: 'Pati de la Residència Sant Josep', lat: 41.538914798953364, lng: 2.4439703839441855 },
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

  if (Array.isArray(parsed)) {
    if (parsed.length === 0) throw new Error('La ruta és buida.')
    const first = parsed[0]
    // [[lng, lat], ...] — coordinate pairs (GeoJSON order)
    if (Array.isArray(first)) {
      return (parsed as [number, number][]).map(([lng, lat]) => ({ lat, lng }))
    }
    // [{lat, lng}, ...] — already our format
    if (typeof first === 'object' && first !== null && 'lat' in first && 'lng' in first) {
      return parsed as RoutePoint[]
    }
    throw new Error('Array no reconegut. Espera [[lng,lat],...] o [{lat,lng},...].')
  }

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

  throw new Error('Format no reconegut. Accepta: [[lng,lat]], [{lat,lng}], LineString, Feature o FeatureCollection.')
}

const TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  cercavila: { label: 'Cercavila', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  correfoc: { label: 'Correfoc', color: 'bg-red-100 text-red-700 border-red-200' },
  concert: { label: 'Concert', color: 'bg-violet-100 text-violet-700 border-violet-200' },
  sardanes: { label: 'Sardanes', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  castellera: { label: 'Castellera', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  gegants: { label: 'Gegants', color: 'bg-teal-100 text-teal-700 border-teal-200' },
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

/** Format minutes as "Xh Ymin" / "Xh" / "Ymin" */
function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h && m) return `${h}h ${m}min`
  if (h) return `${h}h`
  return `${m}min`
}

function getDayKey(iso: string) {
  return new Date(iso).toLocaleDateString('ca-ES', {
    timeZone: 'Europe/Madrid',
    day: '2-digit',
    month: '2-digit',
  })
}

// ── Form types & helpers ────────────────────────────────────────────────────
interface EventFormData {
  title: string
  type: string
  category: string
  kind: string
  short_description: string
  image_url: string
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

/** Treat a datetime-local string ("YYYY-MM-DDTHH:mm") as Europe/Madrid wall-clock
 *  time and return the corresponding UTC ISO instant. */
function madridLocalToISO(local: string): string {
  // Step 1: parse the wall-clock value as if it were UTC. This gives us a
  // reference instant whose UTC representation matches the typed digits.
  const asIfUTC = new Date(local + 'Z').getTime()

  // Step 2: ask what Madrid's clock would show at that instant. The delta
  // between "Madrid clock" and "UTC clock" at this moment IS Madrid's offset
  // (positive in summer: UTC+2, otherwise UTC+1).
  const madridStr = new Intl.DateTimeFormat('sv', {
    timeZone: 'Europe/Madrid',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(new Date(asIfUTC)).replace(' ', 'T')
  const madridOffsetMs = new Date(madridStr + 'Z').getTime() - asIfUTC

  // Step 3: Madrid wall-clock → UTC instant is just "subtract the offset".
  return new Date(asIfUTC - madridOffsetMs).toISOString()
}

function emptyForm(): EventFormData {
  return {
    title: '', type: 'concert', category: 'cultural', kind: 'static',
    short_description: '', image_url: '', start_time: '', end_time: '',
    location_name: '', location_lat: '', location_lng: '', route_json: '',
  }
}

function rowToForm(row: EventRow): EventFormData {
  return {
    title: row.title, type: row.type, category: row.category, kind: row.kind,
    short_description: row.short_description,
    image_url: row.image_url ?? '',
    start_time: toDateTimeLocal(row.start_time),
    end_time: toDateTimeLocal(row.end_time),
    location_name: row.location_name ?? '',
    location_lat: row.location_lat?.toString() ?? '',
    location_lng: row.location_lng?.toString() ?? '',
    route_json: row.route ? JSON.stringify(row.route, null, 2) : '',
  }
}

export function EventsClient({ events: rawEvents }: { events: EventRow[] }) {
  // Pre-calculate day keys for performance (avoid toLocaleDateString in filter loops)
  const events = useMemo(() => rawEvents.map(e => ({
    ...e,
    dayKey: getDayKey(e.start_time)
  })), [rawEvents])

  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const normalizedSearch = useMemo(() => deferredSearch.trim().toLowerCase(), [deferredSearch])
  const [selectedDay, setSelectedDay] = useState<string>('all')
  const [selectedKind, setSelectedKind] = useState<'all' | 'static' | 'mobile'>('all')
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
      if (!seen.has(e.dayKey!)) {
        seen.add(e.dayKey!)
        result.push({ key: e.dayKey!, label: formatDay(e.start_time) })
      }
    }
    return result
  }, [active])

  // YYYY-MM-DD strings for every festival day
  const availableDays = useMemo(() => {
    const seen = new Set<string>()
    const result: string[] = []
    for (const e of events) {
      const day = toDateTimeLocal(e.start_time).slice(0, 10)
      if (!seen.has(day)) { seen.add(day); result.push(day) }
    }
    return result.sort()
  }, [events])

  const filteredEvents = useMemo(() => {
    const base = selectedDay === 'cancelled' ? cancelled : active
    const dayFilter = (selectedDay !== 'all' && selectedDay !== 'cancelled') ? selectedDay : undefined

    return base.filter((e) => {
      const matchSearch = !normalizedSearch || e.title.toLowerCase().includes(normalizedSearch)
      const matchDay = !dayFilter || e.dayKey === dayFilter
      const matchKind = selectedKind === 'all' || e.kind === selectedKind
      return matchSearch && matchDay && matchKind
    })
  }, [active, cancelled, normalizedSearch, selectedDay, selectedKind])

  // Counts for the chips (independent of the current filters)
  const counts = useMemo(() => {
    const dayFilter = (selectedDay !== 'all' && selectedDay !== 'cancelled') ? selectedDay : undefined
    const baseForKind = active.filter(e => {
      const matchSearch = !normalizedSearch || e.title.toLowerCase().includes(normalizedSearch)
      const matchDay = !dayFilter || e.dayKey === dayFilter
      return matchSearch && matchDay
    })

    return {
      all: active.filter(e => !normalizedSearch || e.title.toLowerCase().includes(normalizedSearch)).length,
      days: days.map(d => ({
        key: d.key,
        count: active.filter(e => e.dayKey === d.key && (!normalizedSearch || e.title.toLowerCase().includes(normalizedSearch))).length
      })),
      kinds: {
        all: baseForKind.length,
        static: baseForKind.filter(e => e.kind === 'static').length,
        mobile: baseForKind.filter(e => e.kind === 'mobile').length
      }
    }
  }, [active, days, normalizedSearch, selectedDay])

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
        short_description: data.short_description,
        image_url: data.image_url || undefined,
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
    <div className="space-y-5 sm:space-y-6">
      {/* Header: stats + new-event button */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <StatCard label="Total" value={events.length} />
        <StatCard label="Actius" value={active.length} color="text-green-600" />
        <StatCard label="Cancel·lats" value={cancelled.length} color={cancelled.length > 0 ? 'text-destructive' : undefined} />
      </div>

      <header className="flex w-full flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Cercar per títol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setPanelEvent('new')} className="shrink-0 gap-2 w-full sm:w-auto">
          <PlusIcon className="size-4" weight="bold" aria-hidden />
          Nou event
        </Button>
      </header>

      {/* Day filter chips */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
        <DayChip
          label="Tots"
          count={counts.all}
          active={selectedDay === 'all'}
          onClick={() => setSelectedDay('all')}
        />
        {days.map((d, i) => (
          <DayChip
            key={d.key}
            label={d.label}
            count={counts.days[i]?.count ?? 0}
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

      {/* Kind filter chips */}
      <div className="flex flex-wrap gap-2">
        <DayChip
          label="Tots els tipus"
          count={counts.kinds.all}
          active={selectedKind === 'all'}
          onClick={() => setSelectedKind('all')}
        />
        <DayChip
          label="Estàtics"
          icon={MapPinIcon}
          count={counts.kinds.static}
          active={selectedKind === 'static'}
          onClick={() => setSelectedKind('static')}
        />
        <DayChip
          label="Mòbils"
          icon={PersonSimpleWalkIcon}
          count={counts.kinds.mobile}
          active={selectedKind === 'mobile'}
          onClick={() => setSelectedKind('mobile')}
        />
      </div>

      {/* Content panel */}
      <EventList
        events={filteredEvents}
        {...sharedListProps}
        showRestore={selectedDay === 'cancelled'}
      />

      {/* Create / edit slide-over */}
      {panelEvent !== null && (
        <EventFormPanel
          event={panelEvent === 'new' ? null : panelEvent}
          availableDays={availableDays}
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
  availableDays: string[]   // YYYY-MM-DD
  isPending: boolean
  error: string | null
  onClose: () => void
  onSubmit: (data: EventFormData) => void
}

function formatFestivalDay(yyyymmdd: string): string {
  const [y, m, d] = yyyymmdd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('ca-ES', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}


function EventFormPanel({ event, availableDays, isPending, error, onClose, onSubmit }: EventFormPanelProps) {
  const [form, setForm] = useState<EventFormData>(() => {
    if (event) return rowToForm(event)
    const base = emptyForm()
    const defaultDay = availableDays[0] ?? ''
    return { ...base, start_time: defaultDay ? `${defaultDay}T00:00` : '', end_time: defaultDay ? `${defaultDay}T00:00` : '' }
  })
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

  // ── Derived state: duration, validation, map preview ────────────────────

  /** Returns the next-calendar-day for a YYYY-MM-DD string. */
  function nextCalendarDay(day: string): string {
    const d = new Date(`${day}T12:00:00`)
    d.setDate(d.getDate() + 1)
    return d.toISOString().slice(0, 10)
  }

  /**
   * Resolves the correct end_time datetime string.
   * If end HH:MM < start HH:MM AND end hour < 6 → rolls date to next calendar day.
   */
  function resolveEndTime(startDt: string, endTime: string): string {
    const startDay = startDt.slice(0, 10)
    const [endH] = endTime.split(':').map(Number)
    const startHHMM = startDt.slice(11, 16)
    if (endTime < startHHMM && endH < 6) {
      return `${nextCalendarDay(startDay)}T${endTime}`
    }
    return `${startDay}T${endTime}`
  }

  const isNextDay = form.start_time && form.end_time
    ? form.end_time.slice(0, 10) > form.start_time.slice(0, 10)
    : false

  const duration = useMemo(() => {
    if (!form.start_time || !form.end_time) return null
    const s = new Date(form.start_time).getTime()
    const e = new Date(form.end_time).getTime()
    if (Number.isNaN(s) || Number.isNaN(e)) return null
    return Math.round((e - s) / 60000)
  }, [form.start_time, form.end_time])

  const timeError = duration !== null && duration <= 0

  const previewProps = useMemo(() => {
    if (form.kind === 'static') {
      const lat = parseFloat(form.location_lat)
      const lng = parseFloat(form.location_lng)
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        return { kind: 'static' as const, point: { lat, lng } }
      }
      return null
    }
    if (!form.route_json.trim()) return null
    try {
      const route = parseGeoJSON(form.route_json)
      if (route.length < 1) return null
      return { kind: 'mobile' as const, route }
    } catch {
      return null
    }
  }, [form.kind, form.location_lat, form.location_lng, form.route_json])

  const canSubmit = !!form.title.trim() && !!form.short_description.trim() &&
    !!form.start_time && !!form.end_time && !timeError && !isPending

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      {/* Panel — full-screen on mobile, side-sheet on sm+ */}
      <div className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-lg flex-col bg-background shadow-2xl transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold">{event ? 'Editar event' : 'Nou event'}</h2>
            {event && <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">{event.id}</p>}
          </div>
          <button type="button" onClick={handleClose} aria-label="Tancar"
            className="shrink-0 rounded-lg p-2 text-muted-foreground transition-all duration-150 hover:bg-muted hover:text-foreground active:scale-95">
            <XIcon className="size-4" weight="bold" aria-hidden />
          </button>
        </div>

        {/* Scrollable form */}
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form) }} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:space-y-8 sm:p-6">

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
              <div className="space-y-2">
                <Label>Moviment</Label>
                <Select value={form.kind} onValueChange={(v) => v && set('kind', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="static">
                      <MapPinIcon className="size-4" aria-hidden /> Lloc fix
                    </SelectItem>
                    <SelectItem value="mobile">
                      <PersonSimpleWalkIcon className="size-4" aria-hidden /> Mòbil
                    </SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="space-y-2">
                <Label htmlFor="f-image">URL de la imatge</Label>
                <Input id="f-image" type="url" value={form.image_url}
                  onChange={(e) => set('image_url', e.target.value)}
                  placeholder="https://…/imatge.jpg" />
                {form.image_url && (
                  <img src={form.image_url} alt="Previsualització"
                    className="mt-2 h-28 w-full rounded-lg object-cover ring-1 ring-border"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                )}
              </div>
            </section>

            {/* Schedule */}
            <section className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Horari</h3>

              {/* Day selector — restricted to festival days */}
              <div className="space-y-2">
                <Label>Dia *</Label>
                <Select
                  value={form.start_time.slice(0, 10)}
                  onValueChange={(day) => setForm((prev) => {
                    const startTime = prev.start_time.slice(11, 16) || '00:00'
                    const endTime = prev.end_time.slice(11, 16) || '00:00'
                    const newStart = `${day}T${startTime}`
                    return {
                      ...prev,
                      start_time: newStart,
                      end_time: resolveEndTime(newStart, endTime),
                    }
                  })}
                >
                  <SelectTrigger><SelectValue placeholder="Selecciona el dia…" /></SelectTrigger>
                  <SelectContent>
                    {availableDays.map((day) => (
                      <SelectItem key={day} value={day}>{formatFestivalDay(day)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time pickers */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="f-start">Hora inici *</Label>
                  <Input id="f-start" type="time" required
                    value={form.start_time.slice(11, 16)}
                    onChange={(e) => set('start_time', `${form.start_time.slice(0, 10)}T${e.target.value}`)}
                    aria-invalid={timeError || undefined} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="f-end">Hora final *</Label>
                  <Input id="f-end" type="time" required
                    value={form.end_time.slice(11, 16)}
                    onChange={(e) => set('end_time', resolveEndTime(form.start_time, e.target.value))}
                    aria-invalid={timeError || undefined} />
                </div>
              </div>

              {/* Live duration / validation feedback */}
              {duration !== null && (
                timeError ? (
                  <p role="alert" className="inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-2.5 py-1.5 text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-150">
                    <WarningIcon className="size-3.5" weight="fill" aria-hidden />
                    L&apos;hora final ha de ser després de la d&apos;inici.
                  </p>
                ) : duration > 0 && (
                  <div className="flex flex-wrap items-center gap-2 animate-in fade-in duration-150">
                    <p className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
                      <CheckIcon className="size-3.5" weight="bold" aria-hidden />
                      Durada: <span className="tabular-nums text-foreground">{formatDuration(duration)}</span>
                    </p>
                    {isNextDay && (
                      <p className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                        🌙 Acaba l&apos;endemà a les{' '}
                        <span className="tabular-nums font-semibold">{form.end_time.slice(11, 16)}</span>
                      </p>
                    )}
                  </div>
                )
              )}
            </section>

            {/* Location */}
            <section className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Localització</h3>

              {/* Live mini-map preview */}
              {previewProps && (
                <div className="animate-in fade-in duration-200">
                  <EventPreviewMap {...previewProps} landmarks={PRESET_LOCATIONS} />
                </div>
              )}

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
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="f-lat">Latitud</Label>
                      <Input id="f-lat" type="number" step="any" inputMode="decimal" value={form.location_lat}
                        onChange={(e) => set('location_lat', e.target.value)} placeholder="41.5678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="f-lng">Longitud</Label>
                      <Input id="f-lng" type="number" step="any" inputMode="decimal" value={form.location_lng}
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
                          return (
                            <span className="ml-2 inline-flex items-center gap-1 font-normal text-green-600">
                              <CheckIcon className="size-3.5" weight="bold" aria-hidden />
                              {pts.length} punts
                            </span>
                          )
                        } catch {
                          return (
                            <span className="ml-2 inline-flex items-center gap-1 font-normal text-destructive">
                              <WarningIcon className="size-3.5" weight="fill" aria-hidden />
                              Format invàlid
                            </span>
                          )
                        }
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

          {/* Sticky footer (respects iOS safe-area) */}
          <div
            className="shrink-0 space-y-3 border-t bg-background px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6"
          >
            {error && (
              <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive animate-in fade-in slide-in-from-bottom-1 duration-150">
                <WarningIcon className="mr-1 inline size-3.5 -translate-y-px" weight="fill" aria-hidden />
                {error}
              </p>
            )}
            <div className="flex gap-3">
              <Button type="submit" disabled={!canSubmit} className="flex-1">
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
const DayChip = memo(function DayChip({ label, count, active, onClick, destructive, icon: Icon }: {
  label: string
  count: number
  active: boolean
  onClick: () => void
  destructive?: boolean
  icon?: PhosphorIcon
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ease-out active:scale-[0.97]',
        active && !destructive && 'border-primary bg-primary text-primary-foreground shadow-sm',
        active && destructive && 'border-destructive bg-destructive text-destructive-foreground shadow-sm',
        !active && !destructive && 'border-border bg-background text-foreground hover:bg-muted hover:border-foreground/20',
        !active && destructive && 'border-destructive/40 bg-destructive/5 text-destructive hover:bg-destructive/10',
      ].filter(Boolean).join(' ')}
    >
      {Icon && <Icon className="size-4" weight={active ? 'fill' : 'regular'} aria-hidden />}
      {label}
      <span className={[
        'rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums transition-colors',
        active && !destructive && 'bg-primary-foreground/20 text-primary-foreground',
        active && destructive && 'bg-destructive-foreground/20 text-destructive-foreground',
        !active && 'bg-muted text-muted-foreground',
      ].filter(Boolean).join(' ')}>
        {count}
      </span>
    </button>
  )
})

// ── StatCard ────────────────────────────────────────────────────────────────
const StatCard = memo(function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="rounded-xl border bg-card px-3 py-3 shadow-sm transition-all duration-200 hover:shadow-md hover:border-foreground/15 sm:rounded-2xl sm:px-5 sm:py-4">
      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">{label}</p>
      <p className={`mt-0.5 text-2xl font-bold tabular-nums sm:mt-1 sm:text-3xl ${color ?? 'text-foreground'}`}>{value}</p>
    </div>
  )
})

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

const EventItem = memo(function EventItem({
  event, cancelingId, reason, isPending, showRestore,
  onStartCancel, onReasonChange, onQuickReason, onConfirmCancel, onCancelAbort, onRestore, onEdit,
}: { event: EventRow } & Omit<EventListProps, 'events'>) {
  const type = TYPE_CONFIG[event.type] ?? { label: event.type, color: 'bg-gray-100 text-gray-600 border-gray-200' }
  const isCanceling = cancelingId === event.id

  return (
    <li className={`transition-colors duration-150 ${isCanceling ? 'bg-destructive/5' : 'hover:bg-muted/40'}`}>
      <div className="grid gap-3 p-3 sm:grid-cols-[110px_1fr_auto] sm:items-center sm:gap-4 sm:p-4">
        {/* Time */}
        <div className="flex items-center gap-2 sm:block">
          <div className="font-semibold tabular-nums">{formatTime(event.start_time)}</div>
          <div className="text-xs text-muted-foreground">{formatDay(event.start_time)}</div>
        </div>

        {/* Title + meta */}
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${type.color}`}>
              {type.label}
            </span>
            <span className={`font-medium wrap-break-word ${event.is_cancelled ? 'line-through text-muted-foreground' : ''}`}>
              {event.title}
            </span>
          </div>
          {event.location_name && (
            <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPinIcon className="size-3" aria-hidden />
              {event.location_name}
            </p>
          )}
          {event.cancelled_reason && (
            <p className="inline-flex items-center gap-1 text-xs text-destructive">
              <WarningIcon className="size-3" weight="fill" aria-hidden />
              {event.cancelled_reason}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <Button size="xs" variant="outline" disabled={isPending}
            onClick={() => onEdit(event)} className="gap-1.5"
            aria-label="Editar event">
            <PencilSimpleIcon className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">Editar</span>
          </Button>
          {showRestore ? (
            <Button size="xs" variant="outline" disabled={isPending}
              onClick={() => onRestore(event.id)} className="gap-1.5"
              aria-label="Restaurar event">
              <ArrowCounterClockwiseIcon className="size-3.5" aria-hidden />
              <span className="hidden sm:inline">Restaurar</span>
            </Button>
          ) : (
            <Button size="xs" variant="destructive" disabled={isPending}
              onClick={() => onStartCancel(event.id)} className="gap-1.5"
              aria-label="Cancel·lar event">
              <ProhibitIcon className="size-3.5" aria-hidden />
              <span className="hidden sm:inline">Cancel·lar</span>
            </Button>
          )}
        </div>
      </div>

      {isCanceling && (
        <div className="border-t bg-destructive/5 p-3 sm:p-4 animate-in fade-in slide-in-from-top-1 duration-200">
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-destructive">
            <WarningIcon className="size-3.5" weight="fill" aria-hidden />
            Motiu de la cancel·lació — <span className="font-normal">{event.title}</span>
          </p>
          <div className="mb-2 flex flex-wrap gap-1">
            {QUICK_REASONS.map((r) => (
              <button key={r} type="button"
                onClick={() => onQuickReason(r)}
                className={`rounded-full border px-3 py-1 text-xs transition-all duration-150 hover:bg-muted active:scale-95 ${reason === r ? 'border-destructive bg-destructive/10 text-destructive' : 'border-border text-muted-foreground'}`}>
                {r}
              </button>
            ))}
          </div>
          <Textarea
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            placeholder="O escriu un motiu personalitzat..."
            className="mb-3 min-h-15 text-sm"
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="sm" variant="destructive" disabled={!reason.trim() || isPending}
              onClick={() => onConfirmCancel(event.id)} className="gap-1.5">
              <ProhibitIcon className="size-4" aria-hidden />
              Confirmar cancel·lació
            </Button>
            <Button size="sm" variant="outline" onClick={onCancelAbort}>
              Enrere
            </Button>
          </div>
        </div>
      )}
    </li>
  )
})

const EventList = memo(function EventList({ events, ...props }: EventListProps) {
  if (events.length === 0)
    return <p className="py-12 text-center text-sm text-muted-foreground">Cap event trobat.</p>

  return (
    <ul role="list" className="divide-y rounded-2xl border bg-card shadow-sm overflow-hidden">
      {events.map((event) => (
        <EventItem key={event.id} event={event} {...props} />
      ))}
    </ul>
  )
})
