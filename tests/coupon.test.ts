import { test } from "node:test";
import assert from "node:assert/strict";
import { applyCoupon, parseCoupons, MAX_PERCENT } from "../src/coupon.ts";

const coupons = parseCoupons(
  JSON.stringify([
    { code: "save10", percent: 10, validUntil: "2026-12-31", minOrder: 20 },
    { code: "HALF", percent: 50, validUntil: "2026-12-31", minOrder: 0 },
  ]),
);

// Happy path
test("applyCoupon takes 10 percent off the order", () => {
  assert.equal(applyCoupon(coupons, "SAVE10", 80, "2026-12-01"), 72);
});

// Negative
test("applyCoupon rejects an unknown coupon code", () => {
  assert.throws(() => applyCoupon(coupons, "NOPE", 80, "2026-12-01"), { message: "Unknown coupon code" });
});

test("applyCoupon throws for an expired coupon", () => {
  assert.throws(() => applyCoupon(coupons, "SAVE10", 80, "2027-01-01"), { message: "Coupon has expired" });
});

test("applyCoupon rejects an order below the minimum", () => {
  assert.throws(() => applyCoupon(coupons, "SAVE10", 19.99, "2026-12-01"), { message: "Order total must be at least 20" });
  assert.throws(() => applyCoupon(coupons, "SAVE10", 0.5, "2026-12-01"), { message: "Order total must be at least 20" });
});

test("parseCoupons rejects invalid JSON", () => {
  assert.throws(() => parseCoupons("{not json"), { message: "Coupon list is not valid JSON" });
});

test("parseCoupons throws when the list is not an array", () => {
  assert.throws(() => parseCoupons('{"code":"X"}'), { message: "Coupon list must be an array" });
});

test("parseCoupons rejects a coupon without a percent", () => {
  assert.throws(() => parseCoupons('[{"code":"X"}]'), { message: "Coupon needs a code and a percent" });
});

test("parseCoupons rejects a percent above the maximum", () => {
  assert.throws(() => parseCoupons(`[{"code":"X","percent":${MAX_PERCENT + 1}}]`), { message: `Coupon percent must be between 1 and ${MAX_PERCENT}` });
});

// Boundary
test("applyCoupon still works on the last day of the coupon", () => {
  assert.equal(applyCoupon(coupons, "SAVE10", 50, "2026-12-31"), 45);
});

test("applyCoupon accepts an order exactly at the minimum", () => {
  assert.equal(applyCoupon(coupons, "SAVE10", 20, "2026-12-01"), 18);
});

test("applyCoupon allows the maximum 50 percent discount", () => {
  assert.equal(applyCoupon(coupons, "HALF", 100, "2026-12-01"), 50);
});

// Edge
test("applyCoupon ignores whitespace and case in the code", () => {
  assert.equal(applyCoupon(coupons, "  save10 ", 100, "2026-12-01"), 90);
});

test("applyCoupon asks for a code when it is empty", () => {
  const result = (() => {
    try {
      return applyCoupon(coupons, "   ", 100, "2026-12-01");
    } catch (err) {
      return (err as Error).message;
    }
  })();
  assert.equal(result, "Enter a coupon code");
});
