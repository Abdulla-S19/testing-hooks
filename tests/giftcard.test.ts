import { test } from "node:test";
import assert from "node:assert/strict";
import { issueGiftCard, readGiftCard, redeemGiftCard } from "../src/giftcard.ts";

const card = issueGiftCard("GC-1", 100, "2026-12-31");

// Happy path
test("redeemGiftCard takes the amount off the balance", () => {
  assert.equal(redeemGiftCard(card, 30, "2026-12-01").balance, 70);
});

test("readGiftCard reads a stored card", () => {
  assert.deepEqual(readGiftCard('{"id":"GC-2","balance":25,"expiresOn":"2027-01-31"}'), { id: "GC-2", balance: 25, expiresOn: "2027-01-31", blocked: false });
});

// Negative
test("issueGiftCard rejects an amount of 0 or less", () => {
  assert.throws(() => issueGiftCard("GC-3", -10, "2026-12-31"), { message: "Gift card amount must be more than 0" });
});

test("redeemGiftCard throws for an expired card", () => {
  assert.throws(() => redeemGiftCard(card, 10, "2027-01-01"), { message: "Gift card has expired" });
});

test("redeemGiftCard rejects more than the balance", () => {
  assert.throws(() => redeemGiftCard(card, 100.01, "2026-12-01"), { message: "Only 100 left on the gift card" });
});

// Boundary
test("redeemGiftCard can use the whole balance, down to zero", () => {
  assert.equal(redeemGiftCard(card, 100, "2026-12-01").balance, 0);
});

// Edge
test("readGiftCard fills in a missing expiry date", () => {
  assert.equal(readGiftCard('{"id":"GC-4","balance":5}').expiresOn, "9999-12-31");
});

// Runs the code but checks nothing, so it can't be classified
test("gift cards can be issued and redeemed in a row", () => {
  const issued = issueGiftCard("GC-5", 50, "2026-12-31");
  redeemGiftCard(issued, 20, "2026-12-01");
});
