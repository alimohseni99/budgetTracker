import {
  calculateBudget,
  calculateTransactions,
  getTransactions,
} from "./budget";

describe("calculateBudget", () => {
  it("should calculate the remaining budget", () => {
    const budget = { budget: 100, transactions: [10, 20, 30] };
    const remaining = calculateBudget(budget);
    expect(remaining).toBe(40);
  });

  it("Should calculate the total of transactions", () => {
    const transactions = [10, 20, 30];
    const total = calculateTransactions(transactions);
    expect(total).toBe(60);
  });
});
