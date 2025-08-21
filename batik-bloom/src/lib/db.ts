import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Repository pattern for products
export class ProductRepository {
  static async findMany(options: {
    where?: any
    include?: any
    orderBy?: any
    skip?: number
    take?: number
  } = {}) {
    return prisma.product.findMany({
      include: {
        category: true,
        variants: true,
        reviews: true,
        collections: true,
        ...options.include,
      },
      ...options,
    })
  }

  static async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: {
          orderBy: [{ color: 'asc' }, { size: 'asc' }],
        },
        reviews: {
          orderBy: { createdAt: 'desc' },
        },
        collections: true,
      },
    })
  }

  static async findFeatured(limit = 6) {
    return prisma.product.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: {
        category: true,
        variants: true,
        reviews: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
  }

  static async search(query: string, options: {
    skip?: number
    take?: number
    filters?: {
      colors?: string[]
      sizes?: string[]
      priceRange?: [number, number]
      categoryId?: string
    }
    sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'best-selling'
  } = {}) {
    const { skip = 0, take = 20, filters = {}, sortBy = 'newest' } = options
    
    const where: any = {
      status: 'ACTIVE',
      ...(query && {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      }),
      ...(filters.categoryId && { categoryId: filters.categoryId }),
    }

    // Add variant-based filters
    if (filters.colors?.length || filters.sizes?.length || filters.priceRange) {
      where.variants = {
        some: {
          ...(filters.colors?.length && { color: { in: filters.colors } }),
          ...(filters.sizes?.length && { size: { in: filters.sizes } }),
        },
      }
    }

    // Add price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      where.price = {
        gte: min,
        lte: max,
      }
    }

    const orderBy: any = (() => {
      switch (sortBy) {
        case 'price-asc':
          return { price: 'asc' }
        case 'price-desc':
          return { price: 'desc' }
        case 'best-selling':
          return { createdAt: 'desc' } // Placeholder - would need sales data
        case 'newest':
        default:
          return { createdAt: 'desc' }
      }
    })()

    return prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: true,
        reviews: true,
        collections: true,
      },
      orderBy,
      skip,
      take,
    })
  }
}

export class CollectionRepository {
  static async findBySlug(slug: string) {
    return prisma.collection.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: 'ACTIVE' },
          include: {
            category: true,
            variants: true,
            reviews: true,
          },
        },
      },
    })
  }

  static async findMany() {
    return prisma.collection.findMany({
      include: {
        products: {
          where: { status: 'ACTIVE' },
          take: 3, // Preview products
        },
      },
    })
  }
}

export class CategoryRepository {
  static async findMany() {
    return prisma.category.findMany({
      include: {
        products: {
          where: { status: 'ACTIVE' },
          take: 1, // Just to check if category has products
        },
      },
    })
  }

  static async findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: 'ACTIVE' },
          include: {
            variants: true,
            reviews: true,
          },
        },
      },
    })
  }
}

// Utility functions
export function calculateAverageRating(reviews: { rating: number }[]) {
  if (reviews.length === 0) return 0
  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
}

export function getProductBadges(product: {
  createdAt: Date
  compareAtPrice?: number | null
  variants: { stock: number }[]
}) {
  const badges: string[] = []
  
  // New badge (products created in last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  if (product.createdAt > thirtyDaysAgo) {
    badges.push('new')
  }
  
  // Sale badge
  if (product.compareAtPrice) {
    badges.push('sale')
  }
  
  // Low stock badge (total stock < 10)
  const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0)
  if (totalStock > 0 && totalStock < 10) {
    badges.push('low-stock')
  }
  
  return badges
}