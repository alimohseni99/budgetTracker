export interface Budget {
  budget: number;
  transactions: number[];
}

export function getBudget(budget: Budget): number {
  const total = budget.transactions.reduce((a, b) => a + b);
  return budget.budget - total;
}
