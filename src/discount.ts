/**
 * Rounds `value` to `decimals` decimal places.
 * Uses half-away-from-zero rounding via `Math.round`.
 */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Applies a percentage discount to `price`, never going below `minPrice`.
 * Throws when `percent` is outside the range [0, 100].
 */
export function applyDiscount(price: number, percent: number, minPrice = 0): number {
  if (percent < 0 || percent > 100) {
    throw new Error("Discount percent must be between 0 and 100");
  }
  const discounted = price * (1 - percent / 100);
  return Math.max(roundTo(discounted, 2), minPrice);
}

/** Returns how much was saved going from `original` to `discounted` (never negative). */
export function savings(original: number, discounted: number): number {
  return Math.max(roundTo(original - discounted, 2), 0);
}

export function discountPercent(original: number, discounted: number): number {
  if (original <= 0) return 0;
  return roundTo(((original - discounted) / original) * 100, 2);
}
