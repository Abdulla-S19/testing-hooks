export interface PriceInput {
  basePrice: number
  quantity: number
  customerTier: 'standard' | 'silver' | 'gold'
  couponCode?: string
}

export const TIER_DISCOUNT = {
  standard: 0,
  silver: 0.05,
  gold: 0.1,
}

export function subtotalOf(input: PriceInput): number {
  return input.basePrice * input.quantity
}

export function tierDiscountOf(input: PriceInput): number {
  const rate = TIER_DISCOUNT[input.customerTier]
  return subtotalOf(input) * rate
}

export function couponDiscountOf(input: PriceInput): number {
  if (!input.couponCode) return 0
  if (input.couponCode === 'WELCOME10') return subtotalOf(input) * 0.1
  if (input.couponCode === 'FLAT50') return Math.min(50, subtotalOf(input))
  return 0
}

export function finalPriceOf(input: PriceInput): number {
  const total = subtotalOf(input) - tierDiscountOf(input) - couponDiscountOf(input)
  return Math.max(0, Math.round(total * 100) / 100)
}
