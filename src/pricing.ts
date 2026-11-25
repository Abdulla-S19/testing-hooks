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

const COUPONS: Record<string, (subtotal: number) => number> = {
  WELCOME10: (subtotal) => subtotal * 0.1,
  FLAT50: (subtotal) => Math.min(50, subtotal),
}

export function couponDiscountOf(input: PriceInput): number {
  const coupon = input.couponCode ? COUPONS[input.couponCode.toUpperCase()] : undefined
  return coupon ? coupon(subtotalOf(input)) : 0
}

export function finalPriceOf(input: PriceInput): number {
  const discounts = tierDiscountOf(input) + couponDiscountOf(input)
  const totalAfterDiscounts = subtotalOf(input) - discounts
  return Math.max(0, Math.round(totalAfterDiscounts * 100) / 100)
}
