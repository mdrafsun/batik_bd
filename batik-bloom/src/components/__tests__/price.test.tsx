import { render, screen } from '@testing-library/react'
import { Price } from '../price'

describe('Price', () => {
  it('formats price correctly', () => {
    render(<Price price={2500} />)
    expect(screen.getByText('$25.00')).toBeInTheDocument()
  })

  it('shows compare at price when provided', () => {
    render(<Price price={2500} compareAtPrice={3000} />)
    
    expect(screen.getByText('$25.00')).toBeInTheDocument()
    expect(screen.getByText('$30.00')).toBeInTheDocument()
    
    // Sale price should have accent color
    const salePrice = screen.getByText('$25.00')
    expect(salePrice).toHaveClass('text-accent')
    
    // Compare at price should be struck through
    const comparePrice = screen.getByText('$30.00')
    expect(comparePrice).toHaveClass('line-through')
  })

  it('does not show compare at price when not on sale', () => {
    render(<Price price={2500} />)
    
    expect(screen.getByText('$25.00')).toBeInTheDocument()
    expect(screen.queryByText('$30.00')).not.toBeInTheDocument()
  })

  it('applies different sizes correctly', () => {
    const { rerender } = render(<Price price={2500} size="sm" />)
    let priceElement = screen.getByText('$25.00')
    expect(priceElement).toHaveClass('text-sm')

    rerender(<Price price={2500} size="lg" />)
    priceElement = screen.getByText('$25.00')
    expect(priceElement).toHaveClass('text-lg')
  })
})