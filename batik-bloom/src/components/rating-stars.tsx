import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  className?: string
}

export function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = 'md', 
  showNumber = false,
  className 
}: RatingStarsProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, i) => {
          const filled = i < Math.floor(rating)
          const partialFill = i === Math.floor(rating) && rating % 1 !== 0
          
          return (
            <div key={i} className="relative">
              <Star 
                className={cn(
                  sizeClasses[size],
                  'text-gray-300'
                )}
                fill="currentColor"
              />
              {(filled || partialFill) && (
                <Star 
                  className={cn(
                    sizeClasses[size],
                    'absolute top-0 left-0 text-yellow-400'
                  )}
                  fill="currentColor"
                  style={{
                    clipPath: partialFill 
                      ? `inset(0 ${100 - (rating % 1) * 100}% 0 0)`
                      : undefined
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
      {showNumber && (
        <span className={cn('text-muted-foreground', textSizeClasses[size])}>
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  )
}