export interface Budget {
  budget: number;
  transactions: number[];
}

export function getBudget(budget: Budget): number {
  if (!budget.transactions || !Array.isArray(budget.transactions)) {
    throw new Error("transactions should be an array");
  }
  const total = budget.transactions.reduce((a, b) => a + b, 0);
  return budget.budget - total;
}
