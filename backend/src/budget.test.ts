import {
  Budget,
  calculateBudget,
  calculateExpenses,
  getExpenses,
} from "./budget";

describe("calculateBudget", () => {
  it("should calculate the remaining budget", () => {
    const budget: Budget = { budget: 100, expenses: [10, 20, 30] };
    const remaining = calculateBudget(budget);
    expect(remaining).toBe(40);
  });
  it("should throw an error if expenses is not an array", () => {
    const budget: Budget = {
      budget: 100,
      expenses: 100 as unknown as number[],
    };

    expect(() => calculateBudget(budget)).toThrow(
      "expenses should be an array"
    );
  });

  it("Should calculate the total of transactions", () => {
    const transactions = [10, 20, 30];
    const total = calculateExpenses(transactions);
    expect(total).toBe(60);
  });

  it("should send a list of transactions", () => {
    const budget = { budget: 100, expenses: [10, 20, 30] };
    const total = getExpenses(budget);
    expect(total).toEqual([10, 20, 30]);
  });
});
