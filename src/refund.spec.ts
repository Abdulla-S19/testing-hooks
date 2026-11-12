import { test } from "node:test";
import assert from "node:assert/strict";
import { roundRefund } from "./refund.ts";

test("roundRefund keeps a normal 2-decimal amount", () => {
  assert.equal(roundRefund(12.5), 12.5);
});

test("roundRefund rounds down extra decimals", () => {
  assert.equal(roundRefund(9.999), 9.99);
});

test("roundRefund returns 0 for zero", () => {
  assert.equal(roundRefund(0), 0);
});

test("roundRefund never returns a negative number", () => {
  assert.equal(roundRefund(-7.25), 0);
});


test("roundRefund rounds a sub-cent amount down to 1 cent", () => {
  assert.equal(roundRefund(0.019), 0.01);
});

test("roundRefund keeps a whole-number amount unchanged", () => {
  assert.equal(roundRefund(100), 100);
});