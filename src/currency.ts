export const EXCHANGE_RATES: Record<string, number> = {
  USD: 83.2,
  EUR: 90.1,
  GBP: 105.4,
}

export function toRupees(amount: number, currency: string): number {
  const rate = EXCHANGE_RATES[currency]
  if (!rate) throw new Error(`Unknown currency ${currency}`)
  return Math.round(amount * rate * 100) / 100
}
