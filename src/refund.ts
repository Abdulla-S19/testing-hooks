/**
 * Rounds a refund amount down to 2 decimal places.
 * Negative amounts are treated as no refund and return 0.
 */
export function roundRefund(amount: number): number {
  if (amount <= 0) {
    return 0;
  }
  return Math.floor(amount * 100) / 100;
}
