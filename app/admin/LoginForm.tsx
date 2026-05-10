'use client'

import { useActionState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { login } from './actions'

type State = { error?: string } | null

export function LoginForm() {
  const [state, action, isPending] = useActionState<State, FormData>(login, null)

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold shadow-lg">
            LS
          </div>
          <h1 className="text-xl font-semibold">Panel d&apos;administració</h1>
          <p className="mt-1 text-sm text-muted-foreground">Les Santes · Mataró</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Accedir</CardTitle>
            <CardDescription>Introdueix les teves credencials d&apos;administrador</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={action} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Correu electrònic</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@lessantes.app"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Contrasenya</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </div>

              {state?.error && (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {state.error === 'Invalid login credentials'
                    ? 'Credencials incorrectes'
                    : state.error}
                </p>
              )}

              <Button type="submit" className="mt-2 w-full" disabled={isPending}>
                {isPending ? 'Accedint...' : 'Accedir'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
