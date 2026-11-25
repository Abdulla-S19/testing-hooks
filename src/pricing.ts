export interface PriceInput {
  basePrice: number
  quantity: number
  customerTier: 'standard' | 'silver' | 'gold' | 'platinum'
  couponCode?: string
}

export const TIER_DISCOUNT = {
  standard: 0,
  silver: 0.04,
  gold: 0.08,
  platinum: 0.12,
}

export function subtotalOf(input: PriceInput): number {
  return input.basePrice * input.quantity
}

export function tierDiscountOf(input: PriceInput): number {
  const tierRate = TIER_DISCOUNT[input.customerTier] ?? 0
  return subtotalOf(input) * tierRate
}

const COUPONS: Record<string, (subtotal: number) => number> = {
  WELCOME10: (subtotal) => Math.round(subtotal * 0.1 * 100) / 100,
  FLAT50: (subtotal) => Math.min(50, Math.max(0, subtotal)),
}

export function couponDiscountOf(input: PriceInput): number {
  const code = input.couponCode?.trim().toUpperCase()
  const coupon = code ? COUPONS[code] : undefined
  return coupon ? coupon(subtotalOf(input)) : 0
}

export function finalPriceOf(input: PriceInput): number {
  const discounts = tierDiscountOf(input) + couponDiscountOf(input)
  const totalAfterDiscounts = subtotalOf(input) - discounts
  return Math.max(0, Math.round(totalAfterDiscounts * 100) / 100)
}
