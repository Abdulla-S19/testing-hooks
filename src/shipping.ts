export interface ShippingInput {
  weightKg: number
  distanceKm: number
  express: boolean
}

export const BASE_RATE_PER_KG = 12
export const RATE_PER_KM = 0.8
export const EXPRESS_SURCHARGE = 75

export function weightChargeOf(input: ShippingInput): number {
  return input.weightKg * BASE_RATE_PER_KG
}

export function distanceChargeOf(input: ShippingInput): number {
  return input.distanceKm * RATE_PER_KM
}

export function shippingCostOf(input: ShippingInput): number {
  const charge = weightChargeOf(input) + distanceChargeOf(input)
  const withExpress = input.express ? charge + EXPRESS_SURCHARGE : charge
  return Math.round(withExpress * 100) / 100
}
