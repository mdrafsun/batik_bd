'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { useCartStore, useUIStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Kids', href: '/collections/kids' },
  { name: 'New Arrivals', href: '/collections/new-arrivals' },
  { name: 'Sale', href: '/collections/sale' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { getTotalItems, openCart } = useCartStore()
  const { mobileMenuOpen, setMobileMenuOpen, searchOpen, setSearchOpen } = useUIStore()
  const totalItems = getTotalItems()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200',
        isScrolled && 'shadow-sm'
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                className="hidden sm:flex"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Account */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Account"
                className="hidden sm:flex"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                aria-label={`Cart with ${totalItems} items`}
                className="relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        {searchOpen && (
          <div className="border-t bg-background px-4 py-3 sm:hidden">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative bg-background border-r shadow-lg h-full w-64 p-6">
            <nav className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-base font-medium text-foreground hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t space-y-4">
              <Link
                href="/account"
                className="flex items-center space-x-3 text-base font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
              
              <button
                onClick={() => {
                  setSearchOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="flex items-center space-x-3 text-base font-medium text-foreground hover:text-accent transition-colors w-full text-left"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}