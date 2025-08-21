import { cn } from '@/lib/utils'

interface PriceProps {
  price: number // Price in cents
  compareAtPrice?: number // Compare at price in cents
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Price({ price, compareAtPrice, className, size = 'md' }: PriceProps) {
  const formatPrice = (priceInCents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(priceInCents / 100)
  }

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const isOnSale = compareAtPrice && compareAtPrice > price

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <span className={cn(
        'font-semibold',
        sizeClasses[size],
        isOnSale ? 'text-accent' : 'text-foreground'
      )}>
        {formatPrice(price)}
      </span>
      {isOnSale && (
        <span className={cn(
          'line-through text-muted-foreground',
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
        )}>
          {formatPrice(compareAtPrice)}
        </span>
      )}
    </div>
  )
}