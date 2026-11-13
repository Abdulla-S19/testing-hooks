/**
 * Applies a percentage discount to `price`, never going below `minPrice`.
 * Throws when `percent` is outside the range [0, 100].
 */
export function applyDiscount(price: number, percent: number, minPrice = 0): number {
  if (percent < 0 || percent > 100) {
    throw new Error("Discount percent must be between 0 and 100");
  }
  const discounted = price * (1 - percent / 100);
  return Math.max(Math.round(discounted * 100) / 100, minPrice);
}

/** Returns how much was saved going from `original` to `discounted` (never negative). */
export function savings(original: number, discounted: number): number {
  return Math.max(Math.round((original - discounted) * 100) / 100, 0);
}

export function discountPercent(original: number, discounted: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - discounted) / original) * 10000) / 100;
}
