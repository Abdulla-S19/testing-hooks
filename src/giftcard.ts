export interface GiftCard {
  id: string;
  balance: number;
  /** Last day the card can be used (YYYY-MM-DD, inclusive). */
  expiresOn: string;
  blocked: boolean;
}

export class GiftCardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GiftCardError";
  }
}

export const MAX_CARD_VALUE = 500;

/** Issues a new gift card worth `amount`. */
export function issueGiftCard(id: string, amount: number, expiresOn: string): GiftCard {
  if (amount <= 0) {
    throw new GiftCardError("Gift card amount must be more than 0");
  }
  if (amount > MAX_CARD_VALUE) {
    throw new GiftCardError(`Gift card amount can't be more than ${MAX_CARD_VALUE}`);
  }
  return { id, balance: amount, expiresOn, blocked: false };
}

/** Reads a stored gift card, refusing anything malformed. */
export function readGiftCard(json: string): GiftCard {
  let data: Partial<GiftCard>;
  try {
    data = JSON.parse(json);
  } catch {
    throw new GiftCardError("Gift card data is not valid JSON");
  }
  if (typeof data.id !== "string" || typeof data.balance !== "number") {
    throw new GiftCardError("Gift card needs an id and a balance");
  }
  return { id: data.id, balance: data.balance, expiresOn: data.expiresOn ?? "9999-12-31", blocked: data.blocked ?? false };
}

/** Takes `amount` off the card on `today` (YYYY-MM-DD) and returns the card with its new balance. */
export function redeemGiftCard(card: GiftCard, amount: number, today: string): GiftCard {
  if (card.blocked) {
    throw new GiftCardError("Gift card is blocked");
  }
  if (today > card.expiresOn) {
    throw new GiftCardError("Gift card has expired");
  }
  if (amount > card.balance) {
    throw new GiftCardError(`Only ${card.balance} left on the gift card`);
  }
  return { ...card, balance: Math.round((card.balance - amount) * 100) / 100 };
}
