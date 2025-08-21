import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  textClassName?: string
}

export function Logo({ className, textClassName }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={cn("flex items-center space-x-2", className)}
    >
      <div className="flex items-center">
        <span className={cn(
          "font-serif text-2xl font-bold tracking-tight text-primary",
          textClassName
        )}>
          Batik Bloom
        </span>
      </div>
    </Link>
  )
}