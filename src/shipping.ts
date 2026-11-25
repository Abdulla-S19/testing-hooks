export interface ShippingInput {
  weightKg: number
  distanceKm: number
  express: boolean
}

export const SHIPPING_RATES = {
  perKg: 12,
  perKm: 0.8,
  expressSurcharge: 75,
}

const roundToPaise = (amount: number) => Math.round(amount * 100) / 100

export function weightChargeOf(input: ShippingInput): number {
  return roundToPaise(input.weightKg * SHIPPING_RATES.perKg)
}

export function distanceChargeOf(input: ShippingInput): number {
  return roundToPaise(input.distanceKm * SHIPPING_RATES.perKm)
}

export function shippingCostOf(input: ShippingInput): number {
  const expressCharge = input.express ? SHIPPING_RATES.expressSurcharge : 0
  return roundToPaise(weightChargeOf(input) + distanceChargeOf(input) + expressCharge)
}
