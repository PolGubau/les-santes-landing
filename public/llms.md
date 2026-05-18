# Les Santes — LLM Reference Document

> Comprehensive technical and product reference for AI assistants working on this codebase.
> Last updated: 2026-05-14. Author: Pol Gubau Amores <pol@polgubau.com>

---

## What is this project?

**Les Santes** is the unofficial digital guide for *Les Santes*, the main festival (*Festa Major*) of Mataró, a city near Barcelona, Catalonia, Spain. The festival runs from **July 24 to 29, 2026** and is one of the most important local festivals in Catalonia.

The project provides festival attendees with real-time information about events: what is happening now, where it is, and when it starts — all without requiring a user account. It is a public-good, open-source project (MIT licence with mandatory attribution) built and maintained by a single developer.

**Live URLs:**
- Landing + admin: `https://lessantes.polgubau.com`
- Privacy policy: `https://lessantes.polgubau.com/privacy`
- Admin panel: `https://lessantes.polgubau.com/admin`

---

## Monorepo structure

```
/
├── app/        # React Native + Expo mobile app (iOS & Android)
└── landing/    # Next.js 15 web: marketing landing + admin panel
```

Both packages are independent. They share no code but share the same Supabase backend (PostgreSQL).

---

## Backend — Supabase

Single Supabase project (`cliswtnozdmddtmkudfp`, region `eu-west-1`).

### Tables

**`events`** — one row per festival event.

| Column | Type | Notes |
|---|---|---|
| `id` | text PK | e.g. `ls25-001` |
| `festival_id` | text | always `les-santes-2026` |
| `title` | text | |
| `type` | text | see EventType enum below |
| `category` | text | `familiar \| nocturn \| tradicional \| cultural` |
| `kind` | text | `static` (fixed pin) or `mobile` (moving route) |
| `icon_name` | text | Lucide icon name |
| `short_description` | text | one sentence |
| `start_time` | timestamptz | UTC |
| `end_time` | timestamptz | UTC |
| `location_name` | text? | human-readable place name |
| `location_lat` | float8? | for static events |
| `location_lng` | float8? | for static events |
| `route` | jsonb? | `[{lat, lng}]` array for mobile events |
| `is_cancelled` | bool | default false |
| `cancelled_reason` | text? | shown in app when cancelled |

**`announcements`** — urgent notices pushed to the app banner.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `festival_id` | text | |
| `title` | text | short headline |
| `message` | text? | optional detail |
| `severity` | text | `info \| warning \| critical` |
| `event_id` | text? | links to a specific event |
| `is_active` | bool | false = archived |
| `created_at` | timestamptz | |

**`postals`** — digitised postcard images of the Gegants (giant figures), read-only from the app.

### Auth

Supabase email/password auth is used **only for the admin panel**. The mobile app is fully anonymous — no login, no user accounts.

---

## Mobile App (`app/`)

### Purpose

Let festival attendees know what is happening **right now**, where events are on a map, and browse the full programme. Works offline via cached data.

### Tech stack

- **React Native** + **Expo SDK 54** + **Expo Router v6** (file-based navigation, native tabs)
- **Zustand** — global state (favourites, map focus)
- **AsyncStorage** — offline event cache
- **Supabase JS client** — data fetching
- **MapLibre GL JS** inside a **WebView** — interactive map (avoids native map dependencies)
- **MapTiler** — vector tile provider (`EXPO_PUBLIC_MAPTILER_KEY`)
- **Supercluster** — marker clustering inside the WebView
- **expo-location** — optional GPS for "near me" filter and map dot
- **expo-calendar** — add events to device calendar
- **expo-haptics** — tactile feedback
- **expo-store-review** — request App Store / Play Store review when user adds ≥3 favourites
- **i18n** — Catalan primary (`ca`), English fallback (`en`)

### Environment variables (EAS secrets)

| Key | Used for |
|---|---|
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `EXPO_PUBLIC_MAPTILER_KEY` | MapTiler tiles |
| `EXPO_PUBLIC_DEV_DATE` | Simulated "now" in development (default: `2026-07-27T19:30`) |

### Architecture

```
app/src/
├── entities/
│   ├── event/       # types, useEvents hook, Supabase repo, mock data, withState()
│   ├── announcement/ # useAnnouncements hook
│   └── postal/      # Gegants postcard types
├── features/
│   ├── agenda/      # DayPicker + FilterBar + AgendaList
│   ├── favorites/   # Zustand persistent store (AsyncStorage)
│   ├── map/         # EventMap (MapLibre WebView), MapHeader, MapEventsDrawer, EventSnapSheet
│   ├── now/         # HeroCard, NowCard, UpcomingRow, LiveClock
│   └── recursos/    # Posters grid + Postals lightbox
└── shared/
    ├── constants/   # Colors, Typography, Spacing
    ├── hooks/       # useNow (clock), useUserLocation
    ├── i18n/        # ca.ts + en.ts translations
    ├── lib/         # time utils, haversine distance, calendar helpers
    └── ui/          # Screen, ErrorState, OfflineBanner, etc.
```

### Navigation (tabs)

| Tab | Route | Description |
|---|---|---|
| **Ara** | `/(tabs)/ara` | Live events: HeroCard (first current event) + horizontal strip of others + 4 upcoming |
| **Mapa** | `/(tabs)/mapa` | MapLibre interactive map. Static events = pin markers. Mobile events = coloured route polylines with directional arrows and a centred name+time label |
| **Agenda** | `/(tabs)/agenda` | Full programme. DayPicker synced to horizontal FlatList. Filters: type, category, "Now", "Favourites", "Near me" |
| **Recursos** | `/(tabs)/recursos` | Official posters since 1892 (AVIF, masonry grid) + Gegants postcards (swipeable lightbox) |

### Event data model

```typescript
type EventType =
  "cercavila" | "correfoc" | "concert" | "sardanes" | "castellera" |
  "gegants"   | "havaneres"| "exposicio"| "espectacle"| "missa"     |
  "focsartificials" | "cursa" | "jocs" | "contes" | "barram" | "altres"

type EventKind     = "static" | "mobile"
type EventState    = "now" | "upcoming" | "finished"   // computed at runtime
type EventCategory = "familiar" | "nocturn" | "tradicional" | "cultural"

// Static event — fixed location pin on the map
interface StaticRawEvent {
  kind: "static"
  location: { lat: number; lng: number }
  locationName?: string
  // + common fields: id, title, type, category, icon, shortDescription, start, end
}

// Mobile event — moves along a route (e.g. cercavila, gegants parade)
interface MobileRawEvent {
  kind: "mobile"
  route: { lat: number; lng: number }[]  // ordered waypoints
  locationName?: string
}
```

`withState(event, now)` is a pure function that computes `EventState` from `start`/`end` ISO strings and the current `Date`. Called every 15 seconds by `useNowEvents`.

**Mobile events** interpolate their position along the route based on elapsed time since `start`. Position is estimated — there is no real GPS tracking of performers.

### Map implementation detail

`EventMap` renders a full-screen **WebView** containing an HTML page that loads MapLibre GL JS and Supercluster from CDN. Communication between React Native and the WebView uses `postMessage` / `injectJavaScript`.

- Static events → Supercluster markers (pin + label DOM elements)
- Mobile events → MapLibre `LineString` sources with three layers: white casing, coloured fill, directional arrow symbols, and a centred `symbol` label showing `title\nHH:MM`
- `MAP_READY` message fires when `map.on('style.load')` resolves
- Offline fallback: if MapTiler fails → tries `openfreemap.org/styles/liberty` → if that also fails → posts `MAP_OFFLINE` and shows native overlay

### Offline support

- `useEvents` reads `AsyncStorage` cache on mount before network fetch
- Cache includes a timestamp shown in the `OfflineBanner`
- Announcements also cached separately

### Favourites

- Persisted via Zustand `persist` + AsyncStorage
- When `totalAdded >= 3` (lifetime), `expo-store-review` is triggered with a 30-day cooldown

---

## Landing (`landing/`)

### Purpose

Marketing website. Converts visitors into app downloads. Also hosts the admin panel and legal pages.

### Tech stack

- **Next.js 15** App Router, React Server Components
- **Tailwind CSS v4** (native CSS syntax, no `tailwind.config.js`)
- **shadcn/ui** — base components
- **Geist** font (sans + mono)
- **Phosphor Icons** (`@phosphor-icons/react`)
- **next/og** — dynamic OpenGraph image at `/opengraph-image`
- **Supabase SSR** client (`@supabase/ssr`) — server-side auth for admin

### Pages

| Route | Description |
|---|---|
| `/` | Main landing page |
| `/privacy` | Privacy policy (indexable, covers Location + Calendar permissions) |
| `/support` | User support page |
| `/about` | About the project |
| `/accessibility` | Accessibility statement |
| `/admin` | Admin login (Supabase email/password) |
| `/admin/events` | Event management (auth-guarded) |
| `/admin/announcements` | Announcements management (auth-guarded) |

### Landing page sections

1. **Hero** — headline, download CTA (App Store + Play Store), mobile mockup
2. **AppScreens** — 7 app screenshots in crossfade stack (AVIF, ~146 KB total, converted from 5.2 MB PNG originals)
3. **Features** — 4-card grid with radial colour glows
4. **Trust** — stats, institutional credentials, Ajuntament de Mataró CTA
5. **PostersMarquee** — infinite scroll carousel of official festival posters (since 1892)
6. **Programme** — excerpt of festival schedule
7. **Footer** — links, privacy, support

### SEO

- `metadataBase`: `https://lessantes.polgubau.com`
- JSON-LD Schema.org: `WebSite` + `MobileApplication` + `Festival`
- `robots.txt`, `sitemap.xml`, `manifest.ts` generated by Next.js
- OpenGraph + Twitter Card with absolute image URLs

---

## Admin Panel (`/admin`)

A password-protected back-office embedded in the Next.js landing, used by the festival organiser to manage content during the festival days.

### Auth flow

1. User visits `/admin` → `LoginForm` (email + password)
2. Server Action `login()` calls `supabase.auth.signInWithPassword()`
3. On success → redirect to `/admin/events`
4. All admin Server Actions call `requireAuth()` which checks `supabase.auth.getUser()` and redirects to `/admin` if unauthenticated

### Events management (`/admin/events`)

Full CRUD for the `events` table.

**Operations:**
- **Create** — slide-over form panel with all fields. Mobile events accept a GeoJSON LineString (from geojson.io) or a raw `[{lat, lng}]` array for the route
- **Edit** — same form panel, pre-populated
- **Cancel** — marks `is_cancelled: true` with a mandatory reason (quick-pick or custom text). Cancelled events appear dimmed in the app with the cancellation reason
- **Restore** — reverts cancellation

**UI features:**
- Stats cards (total / active / cancelled)
- Search by title (debounced 250 ms)
- Day-filter chips
- 28 preset locations for Mataró with coordinates

**Timezone handling:** All datetime-local inputs display times in `Europe/Madrid`. `madridLocalToISO()` converts them to UTC ISO before writing to Supabase.

### Announcements management (`/admin/announcements`)

Create and deactivate urgent banners shown in the app.

**Severity levels:** `info` / `warning` / `critical` (with distinct colours and icons in the app).

Announcements can be linked to a specific event ID. Inactive announcements are archived (shown collapsed in the admin, hidden in the app).

---

## Key design decisions

| Decision | Reason |
|---|---|
| No user authentication in the app | Simplicity, privacy, faster approval on app stores |
| No photo gallery permission | Removed to simplify Play Store approval |
| MapLibre in WebView instead of native maps | Avoids Google Maps native dependency, allows custom MapTiler tiles |
| Mobile event position by time interpolation | No real-time GPS from performers; position estimated from route + elapsed time |
| Catalan as primary language | Festival audience is primarily Catalan-speaking |
| AVIF for all images | ~97% size reduction vs PNG originals |
| Offline-first with AsyncStorage cache | Festival venues often have poor connectivity |
| Primary colour: `oklch(0.56 0.22 25)` | Official Les Santes corporate red |
| No `tailwind.config.js` in landing | Tailwind CSS v4 uses native CSS custom properties |
