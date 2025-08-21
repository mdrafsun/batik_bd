import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Batik Bloom - Beautiful Children's Clothing",
  description: "Discover our beautiful collection of children's clothing. From everyday essentials to special occasion wear, find the perfect pieces for your little ones.",
  keywords: "children's clothing, kids fashion, baby clothes, toddler wear, children's apparel",
  authors: [{ name: "Batik Bloom" }],
  creator: "Batik Bloom",
  publisher: "Batik Bloom",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Batik Bloom',
    title: 'Batik Bloom - Beautiful Children\'s Clothing',
    description: 'Discover our beautiful collection of children\'s clothing. From everyday essentials to special occasion wear, find the perfect pieces for your little ones.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Batik Bloom - Children\'s Clothing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Batik Bloom - Beautiful Children\'s Clothing',
    description: 'Discover our beautiful collection of children\'s clothing.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
