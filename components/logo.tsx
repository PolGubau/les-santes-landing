import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: number
  className?: string
  asLink?: boolean
  subtitle?: string
}

export function Logo({ size = 32, className, asLink = false, subtitle }: LogoProps) {
  const inner = (
    <span
      className={cn(
        "flex items-center gap-2.5",
        asLink && "hover:opacity-80 transition-opacity",
        className,
      )}
    >
      <Image
        src="/icon.png"
        alt="Les Santes"
        width={size}
        height={size}
        className="rounded-lg shrink-0"
      />
      {subtitle ? (
        <span className="flex flex-col">
          <span className="font-semibold text-sm tracking-tight leading-tight">Les Santes</span>
          <span className="text-xs opacity-50 leading-tight">{subtitle}</span>
        </span>
      ) : (
        <span className="font-semibold text-sm tracking-tight">Les Santes</span>
      )}
    </span>
  )

  if (asLink) {
    return <Link href="/">{inner}</Link>
  }
  return inner
}
