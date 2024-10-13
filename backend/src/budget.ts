export interface Budget {
  budget: number;
  transactions: number[];
}

export function calculateBudget(budget: Budget): number {
  if (!budget.transactions || !Array.isArray(budget.transactions)) {
    throw new Error("transactions should be an array");
  }
  const total = budget.transactions.reduce((a, b) => a + b, 0);
  return budget.budget - total;
}

export function getTransactions(transactions: Budget): number[] {
  return transactions.transactions;
}

export function getBudget(budget: Budget): number {
  return budget.budget;
}
export function calculateTransactions(transactions: number[]): number {
  return transactions.reduce((acc, curr) => acc + curr, 0);
}
