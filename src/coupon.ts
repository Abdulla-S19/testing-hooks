export interface Coupon {
  code: string;
  percent: number;
  /** Last day the coupon can be used (YYYY-MM-DD, inclusive). */
  validUntil: string;
  /** Smallest order total the coupon applies to. */
  minOrder: number;
}

export class CouponError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CouponError";
  }
}

export const MAX_PERCENT = 50;

/** Reads a coupon list from JSON, refusing anything malformed. */
export function parseCoupons(json: string): Coupon[] {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    throw new CouponError("Coupon list is not valid JSON");
  }
  if (!Array.isArray(data)) {
    throw new CouponError("Coupon list must be an array");
  }
  return data.map((item) => {
    const c = item as Coupon;
    if (typeof c.code !== "string" || typeof c.percent !== "number") {
      throw new CouponError("Coupon needs a code and a percent");
    }
    if (c.percent <= 0 || c.percent > MAX_PERCENT) {
      throw new CouponError(`Coupon percent must be between 1 and ${MAX_PERCENT}`);
    }
    return { code: c.code.trim().toUpperCase(), percent: c.percent, validUntil: c.validUntil, minOrder: c.minOrder ?? 0 };
  });
}

/** Applies the coupon `code` to an order `total` on `today` (YYYY-MM-DD) and returns the new total. */
export function applyCoupon(coupons: Coupon[], code: string, total: number, today: string): number {
  const wanted = code.trim().toUpperCase();
  if (!wanted) {
    throw new CouponError("Enter a coupon code");
  }
  const coupon = coupons.find((c) => c.code === wanted);
  if (!coupon) {
    throw new CouponError("Unknown coupon code");
  }
  if (today > coupon.validUntil) {
    throw new CouponError("Coupon has expired");
  }
  if (total < coupon.minOrder) {
    throw new CouponError(`Order total must be at least ${coupon.minOrder}`);
  }
  return Math.round(total * (100 - coupon.percent)) / 100;
}
