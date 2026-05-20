import Link from "next/link"
import { HouseIcon } from "@phosphor-icons/react/dist/ssr"

interface PageNavProps {
  breadcrumb: string
}

export function PageNav({ breadcrumb }: PageNavProps) {
  return (
    <nav aria-label="Fil d'Ariadna" className="max-w-3xl mx-auto flex items-center gap-2 text-sm text-muted-foreground px-6 pt-6">
      <Link href="/" aria-label="Inici" className="hover:text-foreground transition-colors flex items-center">
        <HouseIcon weight="fill" className="size-3.5" />
      </Link>
      <span aria-hidden="true">/</span>
      <span className="text-foreground font-medium">{breadcrumb}</span>
    </nav>
  )
}
