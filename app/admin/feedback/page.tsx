import { createAdminClient } from '@/lib/supabase/server'
import { FeedbackClient } from './FeedbackClient'

const FESTIVAL_ID = process.env.FESTIVAL_ID ?? 'les-santes-2026'

export default async function FeedbackPage() {
  const admin = await createAdminClient()
  
  const { data: feedback, error } = await admin
    .from('feedback')
    .select('*')
    .eq('festival_id', FESTIVAL_ID)
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
        Error carregant feedback: {error.message}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Feedback</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Opinions i errors reportats pels usuaris de {FESTIVAL_ID}
        </p>
      </div>
      <FeedbackClient feedback={(feedback as any) ?? []} />
    </div>
  )
}
