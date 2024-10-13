import http from "http";
import { calculateBudget, Budget, getBudget, getTransiction } from "./budget";

const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === "/count" && req.method === "POST") {
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

        console.log(remaining, transactions, totalBudget);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            remainings: remaining,
            transactions: transactions,
            totalBudget: totalBudget,
          })
        );
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON format" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
