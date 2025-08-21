import { MetadataRoute } from 'next'
import { CollectionRepository, ProductRepository } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/size-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shipping-returns`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]

  try {
    // Collection pages
    const collections = await CollectionRepository.findMany()
    const collectionPages = collections.map((collection) => ({
      url: `${baseUrl}/collections/${collection.slug}`,
      lastModified: collection.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }))

    // Product pages
    const products = await ProductRepository.findMany({
      where: { status: 'ACTIVE' },
      take: 1000, // Limit for performance
    })
    const productPages = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...collectionPages, ...productPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages only if database is not available
    return staticPages
  }
}