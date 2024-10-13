export interface Budget {
  budget: number;
  expenses: number[];
}

export function calculateBudget(budget: Budget): number {
  if (!budget.expenses || !Array.isArray(budget.expenses)) {
    throw new Error("expenses should be an array");
  }
  const total = budget.expenses.reduce((a, b) => a + b, 0);
  return budget.budget - total;
}

export function getexpenses(expenses: Budget): number[] {
  return expenses.expenses;
}

export function calculateExpenses(expenses: number[]): number {
  return expenses.reduce((acc, curr) => acc + curr, 0);
}
