import { IncomingMessage, ServerResponse } from "http";
import {
  calculateBudget,
  Budget,
  getTransactions,
  calculateTransactions,
} from "./budget";

let transactions: number[] = [];
let currentBudget: Budget = { budget: 0, transactions: [] };
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
      transactions.push(...data.transactions);
      remaining = calculateBudget(data);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          remainings: remaining,
          transactions: getTransactions(data),
          budget: currentBudget.budget,
        })
      );
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON format" }));
    }
  });
}

export function handleGetTransactionsRequest(
  req: IncomingMessage,
  res: ServerResponse
) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ transactions }));
}

export function handlecalculateTransactionsRequest(
  req: IncomingMessage,
  res: ServerResponse
) {
  const total = calculateTransactions(transactions);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ total }));
}
export function handleGetBudgetRequest(
  req: IncomingMessage,
  res: ServerResponse
) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ budget: currentBudget.budget }));
}
export function handlGetRemainingRequest(
  req: IncomingMessage,
  res: ServerResponse
) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ remaining }));
}
