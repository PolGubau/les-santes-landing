"use client"

import { usePathname } from "next/navigation"

const HIDDEN_PREFIXES = ["/admin"]

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname && HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null
  }
  return <>{children}</>
}
