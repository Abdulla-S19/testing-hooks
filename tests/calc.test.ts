import { test } from "node:test";
import assert from "node:assert/strict";
import { multiply, divide, clamp } from "../src/calc.ts";

test("multiply returns the product of all values", () => {
  assert.equal(multiply(2, 3, 4), 24);
});

test("multiply with no values returns 1", () => {
  assert.equal(multiply(), 1);
});

test("divide returns the quotient", () => {
  assert.equal(divide(10, 4), 2.5);
});

test("divide by zero throws a clear error", () => {
  assert.throws(() => divide(5, 0), { message: "Cannot divide by zero" });
});

test("clamp keeps a value inside the range unchanged", () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test("clamp returns the limit for values at or beyond the limits", () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
  assert.equal(clamp(-3, 0, 10), 0);
  assert.equal(clamp(42, 0, 10), 10);
});


test("multiply with a single value returns that value", () => {
  assert.equal(multiply(7), 7);
});

test("multiply returns 0 when any value is 0", () => {
  assert.equal(multiply(5, 0, 3), 0);
});

test("divide handles a negative dividend", () => {
  assert.equal(divide(-9, 3), -3);
});