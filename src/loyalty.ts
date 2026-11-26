export class LoyaltyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoyaltyError";
  }
}

/** Points earned per 10 spent. */
export const POINTS_PER_10 = 1;
/** Points are spent in blocks of this size... */
export const SPEND_BLOCK = 100;
/** ...each worth this much off the order. */
export const BLOCK_VALUE = 5;

/** Whole points earned on an order of `total`. */
export function pointsEarned(total: number): number {
  if (total < 0) {
    throw new LoyaltyError("Order total can't be negative");
  }
  return Math.floor(total / 10) * POINTS_PER_10;
}

/** Spends `points` from `balance` on an order of `total`; returns the new balance and the discount. */
export function spendPoints(balance: number, points: number, total: number): { balance: number; discount: number } {
  if (points % SPEND_BLOCK !== 0) {
    throw new LoyaltyError(`Points are spent in blocks of ${SPEND_BLOCK}`);
  }
  if (points > balance) {
    throw new LoyaltyError(`Only ${balance} points available`);
  }
  const discount = (points / SPEND_BLOCK) * BLOCK_VALUE;
  if (discount > total) {
    throw new LoyaltyError("Discount can't be more than the order total");
  }
  return { balance: balance - points, discount };
}
