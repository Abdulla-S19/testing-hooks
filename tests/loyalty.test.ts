import { test } from "node:test";
import assert from "node:assert/strict";
import { pointsEarned, spendPoints } from "../src/loyalty.ts";

// Happy path
test("pointsEarned gives 1 point for every 10 spent", () => {
  assert.equal(pointsEarned(250), 25);
});

test("spendPoints turns 200 points into 10 off", () => {
  assert.deepEqual(spendPoints(350, 200, 80), { balance: 150, discount: 10 });
});

// Negative
test("pointsEarned rejects a negative order total", () => {
  assert.throws(() => pointsEarned(-1), { message: "Order total can't be negative" });
});

test("spendPoints rejects more points than the balance", () => {
  assert.throws(() => spendPoints(100, 200, 80), { message: "Only 100 points available" });
});

// Boundary
test("pointsEarned rounds down at the limit just below 20", () => {
  assert.equal(pointsEarned(19.99), 1);
});

test("spendPoints can spend the whole balance down to zero", () => {
  assert.deepEqual(spendPoints(300, 300, 50), { balance: 0, discount: 15 });
});
