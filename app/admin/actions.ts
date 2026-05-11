'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function login(
  _prevState: { error?: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) return { error: error.message }

  redirect('/admin/events')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin')
}

// ─── Auth guard helper ───────────────────────────────────────────────────────

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin')
  return supabase
}

// ─── Events ──────────────────────────────────────────────────────────────────

export async function cancelEvent(id: string, reason: string) {
  const supabase = await requireAuth()

  const { error } = await supabase
    .from('events')
    .update({ is_cancelled: true, cancelled_reason: reason })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/events')
}

export async function restoreEvent(id: string) {
  const supabase = await requireAuth()

  const { error } = await supabase
    .from('events')
    .update({ is_cancelled: false, cancelled_reason: null })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/events')
}

export async function updateEventTime(
  id: string,
  startTime: string,
  endTime: string,
) {
  const supabase = await requireAuth()

  const { error } = await supabase
    .from('events')
    .update({ start_time: startTime, end_time: endTime })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/events')
}

interface RoutePoint { lat: number; lng: number }

interface EventPayload {
  title: string
  type: string
  category: string
  kind: string
  icon_name: string
  short_description: string
  start_time: string
  end_time: string
  location_name?: string
  location_lat?: number
  location_lng?: number
  route?: RoutePoint[] | null
}

export async function createEvent(data: EventPayload) {
  const supabase = await requireAuth()
  const festival_id = process.env.FESTIVAL_ID ?? 'les-santes-2026'

  const { error } = await supabase.from('events').insert({
    id: crypto.randomUUID(),
    festival_id,
    is_cancelled: false,
    ...data,
  })

  if (error) return { error: error.message }
  revalidatePath('/admin/events')
}

export async function updateEvent(id: string, data: EventPayload) {
  const supabase = await requireAuth()

  const { error } = await supabase
    .from('events')
    .update(data)
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/events')
}

// ─── Announcements ───────────────────────────────────────────────────────────

export async function createAnnouncement(formData: FormData): Promise<void> {
  const supabase = await requireAuth()

  const { error } = await supabase.from('announcements').insert({
    festival_id: formData.get('festival_id') as string,
    title: formData.get('title') as string,
    message: formData.get('message') as string,
    severity: formData.get('severity') as string,
    event_id: (formData.get('event_id') as string) || null,
  })

  if (error) throw new Error(error.message)

  revalidatePath('/admin/announcements')
}

export async function deactivateAnnouncement(id: string) {
  const supabase = await requireAuth()

  const { error } = await supabase
    .from('announcements')
    .update({ is_active: false })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/announcements')
}
