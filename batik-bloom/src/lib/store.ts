import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  variantId: string
  title: string
  price: number
  compareAtPrice?: number
  image: string
  color: string
  size: string
  quantity: number
  sku: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

interface UIState {
  mobileMenuOpen: boolean
  searchOpen: boolean
  filtersOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setFiltersOpen: (open: boolean) => void
}

interface FilterState {
  colors: string[]
  sizes: string[]
  priceRange: [number, number]
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'best-selling'
  setColors: (colors: string[]) => void
  setSizes: (sizes: string[]) => void
  setPriceRange: (range: [number, number]) => void
  setSortBy: (sortBy: FilterState['sortBy']) => void
  clearFilters: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (newItem) => {
        const items = get().items
        const existingItem = items.find(item => item.variantId === newItem.variantId)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.variantId === newItem.variantId
                ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
                : item
            )
          })
        } else {
          set({
            items: [...items, { ...newItem, quantity: newItem.quantity || 1 }]
          })
        }
      },
      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        })
      },
      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId
              ? { ...item, quantity }
              : item
          )
        })
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  searchOpen: false,
  filtersOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setFiltersOpen: (open) => set({ filtersOpen: open }),
}))

export const useFilterStore = create<FilterState>((set) => ({
  colors: [],
  sizes: [],
  priceRange: [0, 10000], // $0 - $100 in cents
  sortBy: 'newest',
  setColors: (colors) => set({ colors }),
  setSizes: (sizes) => set({ sizes }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sortBy) => set({ sortBy }),
  clearFilters: () => set({
    colors: [],
    sizes: [],
    priceRange: [0, 10000],
    sortBy: 'newest'
  }),
}))