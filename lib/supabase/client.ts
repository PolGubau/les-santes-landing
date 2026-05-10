'use client'

import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase client for Client Components.
 * Uses the anon key — RLS applies.
 * Returns a singleton per page load.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  )
}
