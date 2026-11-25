export const GST_RATES = {
  essentials: 0.05,
  standard: 0.18,
  luxury: 0.28,
}

export type TaxCategory = keyof typeof GST_RATES

export function taxOf(amount: number, category: TaxCategory): number {
  return Math.round(amount * GST_RATES[category] * 100) / 100
}

export function priceWithTaxOf(amount: number, category: TaxCategory): number {
  return Math.round((amount + taxOf(amount, category)) * 100) / 100
}
