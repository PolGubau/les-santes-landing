'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CalendarIcon,
  type Icon as PhosphorIcon,
  MegaphoneIcon,
  SignOutIcon,
} from '@phosphor-icons/react'
import { logout } from './actions'

type NavLink = { href: string; label: string; Icon: PhosphorIcon }

const NAV_LINKS: NavLink[] = [
  { href: '/admin/events', label: 'Esdeveniments', Icon: CalendarIcon },
  { href: '/admin/announcements', label: 'Avisos', Icon: MegaphoneIcon },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1" aria-label="Navegació admin">
      {NAV_LINKS.map(({ href, label, Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            aria-label={label}
            className={[
              'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all duration-150 sm:px-3',
              active
                ? 'bg-foreground/5 text-foreground shadow-inner'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            ].join(' ')}
          >
            <Icon
              className="size-4"
              weight={active ? 'fill' : 'regular'}
              aria-hidden
            />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export function AdminSignOutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        aria-label="Sortir"
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-all duration-150 hover:bg-muted hover:text-foreground active:scale-95 sm:px-3"
      >
        <SignOutIcon className="size-4" aria-hidden />
        <span className="hidden sm:inline">Sortir</span>
      </button>
    </form>
  )
}
