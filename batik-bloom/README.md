# Batik Bloom - Children's Clothing Storefront

A modern, performant e-commerce storefront for children's clothing built with Next.js 14, inspired by the layout and UX of batikworldwide.com's Kids Collection. This project features original content, code, and styling with no copied assets from the reference site.

## ✨ Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **State Management**: Zustand for cart and UI state
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe integration (test mode)
- **UI Components**: shadcn/ui with Lucide React icons
- **Responsive Design**: Mobile-first approach with clean, modern aesthetics
- **Performance**: Optimized images with next/image, route-level caching
- **SEO**: OpenGraph, JSON-LD structured data, sitemap, robots.txt
- **Accessibility**: WCAG 2.2 AA compliant with focus states and ARIA labels
- **Testing**: Vitest with React Testing Library

## 🛍️ Store Features

- **Product Catalog**: Grid view with hover effects, badges, and quick add
- **Advanced Filtering**: Color swatches, size selection, price range
- **Shopping Cart**: Persistent cart with drawer interface
- **Product Pages**: Image galleries, variant selection, reviews
- **Collections**: Curated product groupings (Kids, New Arrivals, Sale)
- **Search**: Debounced search with results grid
- **Responsive Navigation**: Mobile menu with search integration

## 🎨 Brand Identity

- **Brand Name**: Batik Bloom
- **Colors**: Primary (#1F2937), Accent (#A16207), Background (#FFFFFF)
- **Typography**: Inter for body text, Playfair Display for headings
- **Sample Data**: 18 products across 3 collections with placeholder images

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database (local or cloud)
- Stripe account for payment processing

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd batik-bloom
   pnpm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/batik_bloom"
   
   # Stripe (get from https://dashboard.stripe.com/test/apikeys)
   STRIPE_PUBLIC_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   
   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Set up the database**:
   ```bash
   # Generate Prisma client
   pnpm db:generate
   
   # Run migrations
   pnpm db:migrate
   
   # Seed with sample data
   pnpm db:seed
   ```

4. **Start development server**:
   ```bash
   pnpm dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

## 📊 Database Setup Options

### Option 1: Local PostgreSQL
```bash
# Install PostgreSQL locally
# Create database: batik_bloom
# Update DATABASE_URL in .env
```

### Option 2: Neon (Recommended)
1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string to `DATABASE_URL`

### Option 3: Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings > Database
4. Update `DATABASE_URL` in `.env`

## 💳 Stripe Setup

1. Create [Stripe account](https://dashboard.stripe.com/register)
2. Get test API keys from Dashboard > Developers > API keys
3. Add webhook endpoint: `your-domain.com/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `payment_intent.succeeded`
5. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema changes
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio
pnpm db:reset         # Reset database

# Testing
pnpm test             # Run tests
pnpm test:ui          # Run tests with UI

# Linting
pnpm lint             # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── collections/[slug]/ # Collection pages
│   ├── products/[slug]/    # Product pages
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── header.tsx         # Main navigation
│   ├── product-card.tsx   # Product display
│   ├── cart-drawer.tsx    # Shopping cart
│   └── ...
├── lib/                   # Utilities and configuration
│   ├── db.ts             # Database layer
│   ├── store.ts          # Zustand stores
│   └── utils.ts          # Helper functions
└── test/                 # Test setup and utilities
```

## 🎯 Key Components

### ProductCard
- Hover image swapping
- Badge system (New, Sale, Low Stock)
- Quick add functionality
- Rating display

### ProductFilters
- Color swatches with visual feedback
- Size selection grid
- Price range slider
- Mobile-responsive drawer

### CartDrawer
- Slide-over interface
- Quantity controls
- Persistent storage
- Checkout integration

### Header
- Sticky navigation
- Mobile menu
- Search functionality
- Cart indicator

## 🔧 Customization

### Brand Colors
Update `src/app/globals.css`:
```css
:root {
  --primary: #1f2937;    /* Your primary color */
  --accent: #a16207;     /* Your accent color */
  /* ... other colors */
}
```

### Typography
Update font imports in `src/app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');
```

### Sample Data
Modify `prisma/seed.ts` to add your products, collections, and categories.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository**:
   ```bash
   # Push to GitHub, then connect on Vercel dashboard
   ```

2. **Set environment variables**:
   - Add all `.env` variables in Vercel dashboard
   - Update `NEXT_PUBLIC_APP_URL` to your domain

3. **Deploy**:
   ```bash
   # Automatic deployment on git push
   ```

### Other Platforms

The app works on any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🧪 Testing

Run the test suite:
```bash
pnpm test
```

Test coverage includes:
- Product card price logic
- Cart state management
- Filter functionality
- Component rendering

## 🔍 SEO Features

- Dynamic metadata generation
- OpenGraph tags
- JSON-LD structured data
- Sitemap.xml generation
- Robots.txt
- Optimized images with alt tags

## ♿ Accessibility

- WCAG 2.2 AA compliance
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- ARIA labels and roles
- Color contrast compliance

## 📈 Performance

- Lighthouse score target: 95+ mobile
- Image optimization with next/image
- Route-level caching
- ISR for product/collection pages
- Bundle optimization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Layout and UX inspired by batikworldwide.com's Kids Collection
- **Note**: This project contains original content, code, and styling. No assets or proprietary content were copied from the reference site.
- **Icons**: Lucide React
- **UI Components**: shadcn/ui
- **Images**: Placeholder images from Picsum

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ using Next.js 14, TypeScript, and modern web technologies.**
