'use client'

import { useState } from 'react'
import { X, Filter, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useFilterStore, useUIStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface ProductFiltersProps {
  availableColors: string[]
  availableSizes: string[]
  priceRange: [number, number]
  className?: string
}

const colorMap: Record<string, string> = {
  'Indigo': 'bg-indigo-500',
  'Marigold': 'bg-yellow-500',
  'Fern': 'bg-green-500',
}

export function ProductFilters({ 
  availableColors, 
  availableSizes, 
  priceRange,
  className 
}: ProductFiltersProps) {
  const { 
    colors, 
    sizes, 
    priceRange: selectedPriceRange, 
    sortBy,
    setColors,
    setSizes,
    setPriceRange,
    setSortBy,
    clearFilters
  } = useFilterStore()
  
  const { filtersOpen, setFiltersOpen } = useUIStore()
  const [showColorFilter, setShowColorFilter] = useState(true)
  const [showSizeFilter, setShowSizeFilter] = useState(true)
  const [showPriceFilter, setShowPriceFilter] = useState(true)

  const hasActiveFilters = colors.length > 0 || sizes.length > 0 || 
    selectedPriceRange[0] !== priceRange[0] || selectedPriceRange[1] !== priceRange[1]

  const toggleColor = (color: string) => {
    const newColors = colors.includes(color)
      ? colors.filter(c => c !== color)
      : [...colors, color]
    setColors(newColors)
  }

  const toggleSize = (size: string) => {
    const newSizes = sizes.includes(size)
      ? sizes.filter(s => s !== size)
      : [...sizes, size]
    setSizes(newSizes)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Sort by</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="best-selling">Best Selling</option>
        </select>
      </div>

      {/* Colors */}
      <div>
        <button
          onClick={() => setShowColorFilter(!showColorFilter)}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-3"
        >
          Color
          <ChevronDown className={cn(
            'h-4 w-4 transition-transform',
            !showColorFilter && 'rotate-180'
          )} />
        </button>
        
        {showColorFilter && (
          <div className="space-y-2">
            {availableColors.map((color) => (
              <label key={color} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={colors.includes(color)}
                  onChange={() => toggleColor(color)}
                  className="sr-only"
                />
                <div className={cn(
                  'w-5 h-5 rounded-full border-2 flex-shrink-0',
                  colors.includes(color) ? 'border-gray-900' : 'border-gray-300',
                  colorMap[color] || 'bg-gray-300'
                )} />
                <span className="text-sm text-gray-700">{color}</span>
                {colors.includes(color) && (
                  <div className="w-2 h-2 bg-white rounded-full absolute ml-1.5" />
                )}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div>
        <button
          onClick={() => setShowSizeFilter(!showSizeFilter)}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-3"
        >
          Size
          <ChevronDown className={cn(
            'h-4 w-4 transition-transform',
            !showSizeFilter && 'rotate-180'
          )} />
        </button>
        
        {showSizeFilter && (
          <div className="grid grid-cols-2 gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={cn(
                  'px-3 py-2 text-sm border rounded-md transition-colors',
                  sizes.includes(size)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-gray-300 hover:border-gray-400'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => setShowPriceFilter(!showPriceFilter)}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-3"
        >
          Price
          <ChevronDown className={cn(
            'h-4 w-4 transition-transform',
            !showPriceFilter && 'rotate-180'
          )} />
        </button>
        
        {showPriceFilter && (
          <div className="space-y-4">
            <div className="px-3">
              <input
                type="range"
                min={priceRange[0]}
                max={priceRange[1]}
                value={selectedPriceRange[1]}
                onChange={(e) => setPriceRange([selectedPriceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{formatPrice(selectedPriceRange[0])}</span>
              <span>{formatPrice(selectedPriceRange[1])}</span>
            </div>
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setFiltersOpen(true)}
          className="w-full justify-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <Badge variant="accent" className="ml-2 px-1.5 py-0.5 text-xs">
              {colors.length + sizes.length + (selectedPriceRange[0] !== priceRange[0] || selectedPriceRange[1] !== priceRange[1] ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className={cn('hidden lg:block', className)}>
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            {hasActiveFilters && (
              <Badge variant="accent">
                {colors.length + sizes.length + (selectedPriceRange[0] !== priceRange[0] || selectedPriceRange[1] !== priceRange[1] ? 1 : 0)}
              </Badge>
            )}
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/25" onClick={() => setFiltersOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterContent />
            <div className="mt-6 pt-6 border-t">
              <Button 
                onClick={() => setFiltersOpen(false)}
                className="w-full"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}