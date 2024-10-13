import { IncomingMessage, ServerResponse } from "http";
import {
  calculateBudget,
  Budget,
  getBudget,
  getTransiction,
  calculateTransiction,
} from "./budget";

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
      const budget: Budget = JSON.parse(body);
      const remaining = calculateBudget(budget);
      const transactions = getTransiction(budget);
      const totalBudget = getBudget(budget);
      const totalTransiction = calculateTransiction(budget);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          remainings: remaining,
          transactions: transactions,
          totalBudget: totalBudget,
          totalBudgetTransiction: totalTransiction,
        })
      );
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON format" }));
    }
  });
}
