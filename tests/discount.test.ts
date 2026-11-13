import { test } from "node:test";
import assert from "node:assert/strict";
import { applyDiscount, savings } from "../src/discount.ts";

test("applyDiscount takes the percentage off the price", () => {
  assert.equal(applyDiscount(100, 25), 75);
});

test("applyDiscount rounds to 2 decimals", () => {
  assert.equal(applyDiscount(19.99, 15), 16.99);
});

test("applyDiscount never goes below the minimum price", () => {
  assert.equal(applyDiscount(100, 90, 20), 20);
});

test("applyDiscount throws for a percent outside 0-100", () => {
  assert.throws(() => applyDiscount(100, -5), { message: "Discount percent must be between 0 and 100" });
  assert.throws(() => applyDiscount(100, 101), { message: "Discount percent must be between 0 and 100" });
});

test("savings returns the difference between original and discounted", () => {
  assert.equal(savings(100, 80), 20);
});

test("savings is never negative and will not go below zero", () => {
  assert.equal(savings(50, 60), 0);
});