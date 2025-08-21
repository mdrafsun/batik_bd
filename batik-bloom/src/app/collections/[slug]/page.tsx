import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { ProductFilters } from '@/components/product-filters'
import { CollectionRepository, calculateAverageRating, getProductBadges } from '@/lib/db'

interface CollectionPageProps {
  params: {
    slug: string
  }
  searchParams: {
    colors?: string
    sizes?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
  }
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const collection = await CollectionRepository.findBySlug(params.slug)
  
  if (!collection) {
    return {
      title: 'Collection Not Found',
    }
  }

  return {
    title: `${collection.title} - Batik Bloom`,
    description: collection.description || `Shop our ${collection.title} collection`,
    openGraph: {
      title: `${collection.title} - Batik Bloom`,
      description: collection.description || `Shop our ${collection.title} collection`,
      type: 'website',
    },
  }
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const collection = await CollectionRepository.findBySlug(params.slug)

  if (!collection) {
    notFound()
  }

  // Get all available colors and sizes from products
  const availableColors = [...new Set(
    collection.products.flatMap(product => 
      product.variants.map(variant => variant.color)
    )
  )].sort()

  const availableSizes = [...new Set(
    collection.products.flatMap(product => 
      product.variants.map(variant => variant.size)
    )
  )].sort()

  // Get price range
  const prices = collection.products.map(product => product.price)
  const priceRange: [number, number] = [
    Math.min(...prices),
    Math.max(...prices)
  ]

  // Process products with ratings and badges
  const products = collection.products.map(product => ({
    ...product,
    rating: calculateAverageRating(product.reviews),
    reviewCount: product.reviews.length,
    badges: getProductBadges(product),
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                {collection.description}
              </p>
            )}
            <div className="mt-4 text-sm text-gray-500">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              availableColors={availableColors}
              availableSizes={availableSizes}
              priceRange={priceRange}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or check back later for new arrivals.
                </p>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-gray-600">
                    Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      slug={product.slug}
                      title={product.title}
                      price={product.price}
                      compareAtPrice={product.compareAtPrice}
                      images={product.images}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      isNew={product.badges.includes('new')}
                      isOnSale={product.badges.includes('sale')}
                      isLowStock={product.badges.includes('low-stock')}
                    />
                  ))}
                </div>

                {/* Pagination placeholder */}
                {products.length > 12 && (
                  <div className="mt-12 text-center">
                    <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Load More Products
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  // This would generate static params for known collections
  return [
    { slug: 'kids' },
    { slug: 'new-arrivals' },
    { slug: 'sale' },
  ]
}