import { IncomingMessage, ServerResponse } from "http";
import {
  calculateBudget,
  Budget,
  getExpenses,
  calculateExpenses,
} from "./budget";

let expenses: number[] = [];
let currentBudget: Budget = { budget: 0, expenses: [] };
let remaining: number = 0;

export function handleCalculateRequest(
  req: IncomingMessage,
  res: ServerResponse
) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const data: Budget = JSON.parse(body);
      currentBudget.budget = data.budget;
      expenses.push(...data.expenses);
      remaining = calculateBudget(data);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          remainings: remaining,
          expenses: getExpenses(data),
          budget: currentBudget.budget,
        })
      );
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON format" }));
    }
  });
}

export function handleGetExpensesRequest(
  req: IncomingMessage,
  res: ServerResponse
) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ expenses }));
}

export function handleCalculateExpensesRequest(
  req: IncomingMessage,
  res: ServerResponse
) {
  const total = calculateExpenses(expenses);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ total }));
}
