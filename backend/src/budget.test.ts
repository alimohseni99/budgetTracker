import test from "node:test";
import assert from "node:assert";
import { calculateBudget, calculateTransactions } from "./budget";

test("calculateBudget", () => {
  const budget = {
    budget: 100,
    transactions: [10, 20, 30],
  };
  const result = calculateBudget(budget);
  assert.strictEqual(result, 40);
});
