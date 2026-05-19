'use client'

import { useEffect, useRef } from 'react'
import maplibregl, { type LngLatBoundsLike, type Map as MaplibreMap } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export interface PreviewPoint { lat: number; lng: number }
export interface PreviewLandmark { key: string; name: string; lat: number; lng: number }

interface Props {
  kind: 'static' | 'mobile'
  point?: PreviewPoint | null
  route?: PreviewPoint[] | null
  landmarks?: PreviewLandmark[]
  height?: number
}

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY ?? 'xvhIdcAsn7WrwOYPt8W2'
const STREETS_STYLE = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`
const FALLBACK_STYLE = 'https://tiles.openfreemap.org/styles/liberty'

const ROUTE_COLOR = '#0ea5e9'
const START_COLOR = '#10b981'
const END_COLOR = '#ef4444'
const PIN_COLOR = '#0ea5e9'

function makeDot(color: string, size = 14, border = 3): HTMLDivElement {
  const el = document.createElement('div')
  el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${color};border:${border}px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);box-sizing:content-box;`
  return el
}

export function EventPreviewMap({ kind, point, route, landmarks = [], height = 220 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MaplibreMap | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STREETS_STYLE,
      center: [2.444, 41.5378],
      zoom: 14,
      attributionControl: { compact: true },
    })
    let fallbackTried = false
    map.on('error', () => {
      if (fallbackTried) return
      fallbackTried = true
      map.setStyle(FALLBACK_STYLE)
    })
    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const applyContent = () => {
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []

      for (const id of ['route-line', 'route-casing']) {
        if (map.getLayer(id)) map.removeLayer(id)
      }
      if (map.getSource('route')) map.removeSource('route')

      landmarks.forEach((l) => {
        const el = document.createElement('div')
        el.style.cssText =
          'width:6px;height:6px;border-radius:50%;background:rgba(100,116,139,0.55);border:1px solid #fff;'
        el.title = l.name
        markersRef.current.push(
          new maplibregl.Marker({ element: el }).setLngLat([l.lng, l.lat]).addTo(map),
        )
      })

      if (kind === 'static' && point && Number.isFinite(point.lat) && Number.isFinite(point.lng)) {
        markersRef.current.push(
          new maplibregl.Marker({ element: makeDot(PIN_COLOR, 16, 3) })
            .setLngLat([point.lng, point.lat])
            .addTo(map),
        )
        map.easeTo({ center: [point.lng, point.lat], zoom: 15.5, duration: 600 })
        return
      }

      if (kind === 'mobile' && route && route.length >= 1) {
        const coords = route.map((p) => [p.lng, p.lat] as [number, number])

        if (coords.length >= 2) {
          map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: { type: 'LineString', coordinates: coords },
            },
          })
          map.addLayer({
            id: 'route-casing',
            type: 'line',
            source: 'route',
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: { 'line-color': '#fff', 'line-width': 8, 'line-opacity': 0.95 },
          })
          map.addLayer({
            id: 'route-line',
            type: 'line',
            source: 'route',
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: { 'line-color': ROUTE_COLOR, 'line-width': 5 },
          })
        }

        const start = coords[0]
        const end = coords[coords.length - 1]
        markersRef.current.push(
          new maplibregl.Marker({ element: makeDot(START_COLOR, 14, 3) }).setLngLat(start).addTo(map),
        )
        if (coords.length >= 2) {
          markersRef.current.push(
            new maplibregl.Marker({ element: makeDot(END_COLOR, 14, 3) }).setLngLat(end).addTo(map),
          )
        }

        const lngs = coords.map((c) => c[0])
        const lats = coords.map((c) => c[1])
        const bounds: LngLatBoundsLike = [
          [Math.min(...lngs), Math.min(...lats)],
          [Math.max(...lngs), Math.max(...lats)],
        ]
        map.fitBounds(bounds, { padding: 36, duration: 600, maxZoom: 17 })
      }
    }

    if (map.isStyleLoaded()) applyContent()
    else map.once('load', applyContent)
  }, [kind, point?.lat, point?.lng, route, landmarks])

  const isMobile = kind === 'mobile'
  const count = isMobile ? route?.length ?? 0 : point ? 1 : 0

  return (
    <div className="relative overflow-hidden rounded-xl border">
      <div ref={containerRef} style={{ width: '100%', height }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-md bg-background/85 px-1.5 py-0.5 backdrop-blur">
          <span
            className="inline-block size-1.5 rounded-full"
            style={{ background: isMobile ? START_COLOR : PIN_COLOR }}
          />
          {isMobile ? 'Inici' : 'Lloc'}
          {isMobile && (
            <>
              <span className="mx-1 opacity-50">·</span>
              <span className="inline-block size-1.5 rounded-full" style={{ background: END_COLOR }} />
              Final
            </>
          )}
        </span>
        <span className="rounded-md bg-background/85 px-1.5 py-0.5 backdrop-blur tabular-nums">
          {isMobile ? `${count} punts` : '1 punt'}
        </span>
      </div>
    </div>
  )
}


