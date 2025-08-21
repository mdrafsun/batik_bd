import { ProductCard } from '@/components/product-card'

// Mock data for testing
const featuredProducts = [
  {
    id: '1',
    slug: 'botanical-garden-dress',
    title: 'Botanical Garden Dress',
    price: 4500,
    compareAtPrice: 5500,
    images: [
      'https://picsum.photos/600/800?random=1',
      'https://picsum.photos/600/800?random=2',
    ],
    rating: 4.8,
    reviewCount: 24,
    isNew: true,
    isOnSale: true,
  },
  {
    id: '2',
    slug: 'adventure-explorer-shorts',
    title: 'Adventure Explorer Shorts',
    price: 2800,
    images: [
      'https://picsum.photos/600/800?random=4',
      'https://picsum.photos/600/800?random=5',
    ],
    rating: 4.6,
    reviewCount: 18,
    isNew: true,
  },
  {
    id: '3',
    slug: 'rainbow-dreams-tshirt',
    title: 'Rainbow Dreams T-Shirt',
    price: 2200,
    compareAtPrice: 2800,
    images: [
      'https://picsum.photos/600/800?random=6',
      'https://picsum.photos/600/800?random=7',
    ],
    rating: 4.9,
    reviewCount: 32,
    isOnSale: true,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Beautiful Clothing for{' '}
              <span className="text-accent">Little Ones</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collection of children's clothing. 
              From everyday essentials to special occasion wear, each piece is 
              designed with comfort, quality, and style in mind.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/collections/kids"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Shop Now
              </a>
              <a
                href="/collections/new-arrivals"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-accent"
              >
                New Arrivals <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our most popular pieces loved by families everywhere
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/collections/kids"
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shop by Collection
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://picsum.photos/800/600?random=10"
                  alt="Kids Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Kids</h3>
                  <p className="text-sm opacity-90">Complete collection</p>
                </div>
              </div>
            </div>
            
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://picsum.photos/800/600?random=11"
                  alt="New Arrivals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
                  <p className="text-sm opacity-90">Latest additions</p>
                </div>
              </div>
            </div>
            
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://picsum.photos/800/600?random=12"
                  alt="Sale"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Sale</h3>
                  <p className="text-sm opacity-90">Up to 50% off</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
