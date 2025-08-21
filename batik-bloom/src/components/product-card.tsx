'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Price } from '@/components/price'
import { RatingStars } from '@/components/rating-stars'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  id: string
  slug: string
  title: string
  price: number
  compareAtPrice?: number
  images: string[]
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isOnSale?: boolean
  isLowStock?: boolean
  className?: string
}

export function ProductCard({
  id,
  slug,
  title,
  price,
  compareAtPrice,
  images,
  rating,
  reviewCount,
  isNew,
  isOnSale,
  isLowStock,
  className,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const hasMultipleImages = images.length > 1

  return (
    <div 
      className={cn(
        'group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setCurrentImageIndex(0)
      }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
        {isNew && (
          <Badge variant="accent" className="text-xs">
            New
          </Badge>
        )}
        {isOnSale && (
          <Badge variant="destructive" className="text-xs">
            Sale
          </Badge>
        )}
        {isLowStock && (
          <Badge variant="warning" className="text-xs">
            Low Stock
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      {/* Product Image */}
      <Link href={`/products/${slug}`}>
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
          <Image
            src={images[currentImageIndex] || images[0]}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* Image hover effect for multiple images */}
          {hasMultipleImages && isHovered && (
            <div className="absolute inset-x-0 bottom-2 flex justify-center space-x-1">
              {images.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    'h-1.5 w-6 rounded-full transition-colors',
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentImageIndex(index)
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${slug}`} className="block">
          <h3 className="font-medium text-gray-900 hover:text-gray-700 transition-colors line-clamp-2 mb-2">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        {rating && (
          <div className="flex items-center space-x-2 mb-2">
            <RatingStars rating={rating} size="sm" />
            {reviewCount && (
              <span className="text-xs text-muted-foreground">
                ({reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <Price 
          price={price} 
          compareAtPrice={compareAtPrice}
          className="mb-3"
        />

        {/* Quick Add Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Plus className="h-4 w-4 mr-1" />
          Quick Add
        </Button>
      </div>
    </div>
  )
}