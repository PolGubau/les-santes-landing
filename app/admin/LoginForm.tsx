'use client'

import { useActionState } from 'react'
import { SignInIcon, WarningIcon } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { login } from './actions'
import { Logo } from '@/components/logo'

type State = { error?: string } | null

export function LoginForm() {
  const [state, action, isPending] = useActionState<State, FormData>(login, null)

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Logo />
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
                  placeholder="Correu electrònic"
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
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200"
                >
                  <WarningIcon className="mt-0.5 size-4 shrink-0" weight="fill" aria-hidden />
                  <span>
                    {state.error === 'Invalid login credentials'
                      ? 'Credencials incorrectes'
                      : state.error}
                  </span>
                </p>
              )}

              <Button
                type="submit"
                className="mt-2 w-full gap-2"
                disabled={isPending}
              >
                <SignInIcon
                  className={`size-4 transition-transform duration-200 ${isPending ? 'animate-pulse' : ''}`}
                  weight="bold"
                  aria-hidden
                />
                {isPending ? 'Accedint…' : 'Accedir'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
