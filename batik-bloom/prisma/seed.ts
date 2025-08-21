import { PrismaClient, ProductStatus } from '@prisma/client'

const prisma = new PrismaClient()

const colors = ['Indigo', 'Marigold', 'Fern']
const sizes = ['2-3Y', '4-5Y', '6-7Y', '8-9Y']

// Sample product data
const products = [
  {
    title: 'Botanical Garden Dress',
    description: 'A beautiful floral dress perfect for special occasions. Made with soft, breathable fabric and featuring intricate botanical prints.',
    price: 4500, // $45.00
    compareAtPrice: 5500,
    images: [
      'https://picsum.photos/600/800?random=1',
      'https://picsum.photos/600/800?random=2',
      'https://picsum.photos/600/800?random=3',
    ],
  },
  {
    title: 'Adventure Explorer Shorts',
    description: 'Comfortable and durable shorts designed for active kids. Perfect for playground adventures and outdoor activities.',
    price: 2800,
    images: [
      'https://picsum.photos/600/800?random=4',
      'https://picsum.photos/600/800?random=5',
    ],
  },
  {
    title: 'Rainbow Dreams T-Shirt',
    description: 'Soft cotton t-shirt with vibrant rainbow design. Machine washable and designed to maintain its colors wash after wash.',
    price: 2200,
    compareAtPrice: 2800,
    images: [
      'https://picsum.photos/600/800?random=6',
      'https://picsum.photos/600/800?random=7',
      'https://picsum.photos/600/800?random=8',
      'https://picsum.photos/600/800?random=9',
    ],
  },
  {
    title: 'Cozy Cloud Cardigan',
    description: 'Ultra-soft knitted cardigan perfect for layering. Features button closure and ribbed cuffs for a comfortable fit.',
    price: 3800,
    images: [
      'https://picsum.photos/600/800?random=10',
      'https://picsum.photos/600/800?random=11',
    ],
  },
  {
    title: 'Safari Adventure Jumpsuit',
    description: 'One-piece jumpsuit with safari-inspired prints. Easy to wear with snap closures and adjustable straps.',
    price: 4200,
    compareAtPrice: 5000,
    images: [
      'https://picsum.photos/600/800?random=12',
      'https://picsum.photos/600/800?random=13',
      'https://picsum.photos/600/800?random=14',
    ],
  },
  {
    title: 'Ocean Waves Swim Set',
    description: 'Two-piece swim set with UPF 50+ sun protection. Quick-dry fabric with ocean wave patterns.',
    price: 3500,
    images: [
      'https://picsum.photos/600/800?random=15',
      'https://picsum.photos/600/800?random=16',
    ],
  },
  {
    title: 'Starlight Pyjama Set',
    description: 'Comfortable two-piece pyjama set with star and moon prints. Made from organic cotton for sensitive skin.',
    price: 3200,
    images: [
      'https://picsum.photos/600/800?random=17',
      'https://picsum.photos/600/800?random=18',
      'https://picsum.photos/600/800?random=19',
    ],
  },
  {
    title: 'Denim Adventure Jacket',
    description: 'Classic denim jacket with fun patches and embroidered details. Perfect for layering in cooler weather.',
    price: 5200,
    compareAtPrice: 6500,
    images: [
      'https://picsum.photos/600/800?random=20',
      'https://picsum.photos/600/800?random=21',
    ],
  },
  {
    title: 'Fairy Tale Tutu Skirt',
    description: 'Magical tulle skirt perfect for dress-up and special occasions. Features layers of soft tulle and elastic waistband.',
    price: 2900,
    images: [
      'https://picsum.photos/600/800?random=22',
      'https://picsum.photos/600/800?random=23',
      'https://picsum.photos/600/800?random=24',
    ],
  },
  {
    title: 'Superhero Cape Set',
    description: 'Reversible cape with matching mask for imaginative play. Made from lightweight, durable fabric.',
    price: 2500,
    images: [
      'https://picsum.photos/600/800?random=25',
      'https://picsum.photos/600/800?random=26',
    ],
  },
  {
    title: 'Garden Party Romper',
    description: 'Adorable romper with floral print and ruffled sleeves. Features snap closure for easy dressing.',
    price: 3600,
    compareAtPrice: 4200,
    images: [
      'https://picsum.photos/600/800?random=27',
      'https://picsum.photos/600/800?random=28',
      'https://picsum.photos/600/800?random=29',
    ],
  },
  {
    title: 'Athletic Champion Tracksuit',
    description: 'Comfortable two-piece tracksuit perfect for sports and active play. Moisture-wicking fabric keeps kids dry.',
    price: 4800,
    images: [
      'https://picsum.photos/600/800?random=30',
      'https://picsum.photos/600/800?random=31',
    ],
  },
  {
    title: 'Woodland Creatures Hoodie',
    description: 'Cozy hoodie featuring friendly woodland animal prints. Soft fleece lining for extra warmth.',
    price: 4100,
    images: [
      'https://picsum.photos/600/800?random=32',
      'https://picsum.photos/600/800?random=33',
      'https://picsum.photos/600/800?random=34',
    ],
  },
  {
    title: 'Princess Castle Dress',
    description: 'Elegant dress with castle and princess motifs. Perfect for parties and special occasions.',
    price: 5800,
    compareAtPrice: 7200,
    images: [
      'https://picsum.photos/600/800?random=35',
      'https://picsum.photos/600/800?random=36',
    ],
  },
  {
    title: 'Space Explorer Pants',
    description: 'Fun pants with space-themed prints including rockets, planets, and stars. Elastic waistband for comfort.',
    price: 3100,
    images: [
      'https://picsum.photos/600/800?random=37',
      'https://picsum.photos/600/800?random=38',
      'https://picsum.photos/600/800?random=39',
    ],
  },
  {
    title: 'Butterfly Wings Top',
    description: 'Delicate top with butterfly wing prints and flutter sleeves. Made from eco-friendly bamboo fiber.',
    price: 2700,
    images: [
      'https://picsum.photos/600/800?random=40',
      'https://picsum.photos/600/800?random=41',
    ],
  },
  {
    title: 'Dinosaur Discovery Overalls',
    description: 'Sturdy overalls with dinosaur prints and multiple pockets for treasures. Adjustable straps grow with your child.',
    price: 4400,
    compareAtPrice: 5200,
    images: [
      'https://picsum.photos/600/800?random=42',
      'https://picsum.photos/600/800?random=43',
      'https://picsum.photos/600/800?random=44',
    ],
  },
  {
    title: 'Mermaid Tail Leggings',
    description: 'Sparkly leggings with mermaid scale pattern. Stretchy and comfortable for all-day wear.',
    price: 2600,
    images: [
      'https://picsum.photos/600/800?random=45',
      'https://picsum.photos/600/800?random=46',
    ],
  },
]

// Sample reviews
const sampleReviews = [
  {
    rating: 5,
    title: 'Perfect fit and quality!',
    body: 'My daughter loves this dress. The fabric is soft and the colors are vibrant. Highly recommend!',
    authorName: 'Sarah M.',
  },
  {
    rating: 4,
    title: 'Great for active kids',
    body: 'These shorts are perfect for playground activities. They wash well and maintain their shape.',
    authorName: 'Mike R.',
  },
  {
    rating: 5,
    title: 'Beautiful design',
    body: 'The botanical prints are gorgeous and the dress fits perfectly. Will definitely order more!',
    authorName: 'Emma L.',
  },
  {
    rating: 4,
    title: 'Comfortable and stylish',
    body: 'My son wears this everywhere. Comfortable fabric and the design is really cool.',
    authorName: 'David K.',
  },
  {
    rating: 5,
    title: 'Excellent quality',
    body: 'Worth every penny. The attention to detail is impressive and it washes beautifully.',
    authorName: 'Lisa T.',
  },
]

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function main() {
  console.log('🌱 Starting seed...')

  // Clean up existing data
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.review.deleteMany()
  await prisma.variant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.collection.deleteMany()
  await prisma.category.deleteMany()

  // Create category
  console.log('📂 Creating category...')
  const category = await prisma.category.create({
    data: {
      slug: 'kids',
      name: 'Kids',
      description: 'Beautiful clothing for children of all ages',
    },
  })

  // Create collections
  console.log('📚 Creating collections...')
  const collections = await Promise.all([
    prisma.collection.create({
      data: {
        slug: 'kids',
        title: 'Kids Collection',
        description: 'Our complete range of children\'s clothing',
      },
    }),
    prisma.collection.create({
      data: {
        slug: 'new-arrivals',
        title: 'New Arrivals',
        description: 'The latest additions to our collection',
      },
    }),
    prisma.collection.create({
      data: {
        slug: 'sale',
        title: 'Sale',
        description: 'Great deals on selected items',
      },
    }),
  ])

  // Create products
  console.log('👕 Creating products...')
  const createdProducts = []
  
  for (let i = 0; i < products.length; i++) {
    const productData = products[i]
    const slug = createSlug(productData.title)
    
    const product = await prisma.product.create({
      data: {
        slug,
        title: productData.title,
        description: productData.description,
        categoryId: category.id,
        price: productData.price,
        compareAtPrice: productData.compareAtPrice,
        status: ProductStatus.ACTIVE,
        images: productData.images,
      },
    })

    // Create variants for each product
    const variants = []
    for (const color of colors) {
      for (const size of sizes) {
        const variant = await prisma.variant.create({
          data: {
            productId: product.id,
            sku: `${slug}-${color.toLowerCase()}-${size.toLowerCase()}`,
            color,
            size,
            stock: Math.floor(Math.random() * 20) + 5, // Random stock between 5-24
            priceDelta: 0, // No price difference for variants
          },
        })
        variants.push(variant)
      }
    }

    createdProducts.push({ product, variants })

    // Add some reviews to random products
    if (Math.random() > 0.6) {
      const numReviews = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < numReviews; j++) {
        const review = sampleReviews[Math.floor(Math.random() * sampleReviews.length)]
        await prisma.review.create({
          data: {
            productId: product.id,
            rating: review.rating,
            title: review.title,
            body: review.body,
            authorName: review.authorName,
          },
        })
      }
    }
  }

  // Assign products to collections
  console.log('🔗 Assigning products to collections...')
  
  // All products go to Kids collection
  await prisma.collection.update({
    where: { slug: 'kids' },
    data: {
      products: {
        connect: createdProducts.map(p => ({ id: p.product.id })),
      },
    },
  })

  // First 6 products go to New Arrivals
  await prisma.collection.update({
    where: { slug: 'new-arrivals' },
    data: {
      products: {
        connect: createdProducts.slice(0, 6).map(p => ({ id: p.product.id })),
      },
    },
  })

  // Products with compareAtPrice go to Sale
  const saleProducts = createdProducts.filter(p => p.product.compareAtPrice)
  await prisma.collection.update({
    where: { slug: 'sale' },
    data: {
      products: {
        connect: saleProducts.map(p => ({ id: p.product.id })),
      },
    },
  })

  console.log('✅ Seed completed successfully!')
  console.log(`📊 Created:`)
  console.log(`   • 1 category`)
  console.log(`   • 3 collections`)
  console.log(`   • ${createdProducts.length} products`)
  console.log(`   • ${createdProducts.length * colors.length * sizes.length} variants`)
  console.log(`   • Reviews for ${createdProducts.filter((_, i) => Math.random() > 0.6).length} products`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })