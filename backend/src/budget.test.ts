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
  it("should throw an error if transactions is not an array", () => {
    const budget = { budget: 100, transactions: 100 as unknown as number[] };

    const result = () => calculateBudget(budget);

    expect(() => calculateBudget(budget)).toThrow(
      "transactions should be an array"
    );
  });

  it("Should calculate the total of transactions", () => {
    const transactions = [10, 20, 30];
    const total = calculateTransactions(transactions);
    expect(total).toBe(60);
  });

  it("should send a list of transactions", () => {
    const budget = { budget: 100, transactions: [10, 20, 30] };
    const total = getTransactions(budget);
    expect(total).toEqual([10, 20, 30]);
  });
});
