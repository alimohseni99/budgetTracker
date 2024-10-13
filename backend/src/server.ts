import http from "http";
import {
  handleCalculateRequest,
  handleGetTransactionsRequest,
  handlecalculateTransactionsRequest,
  handleGetBudgetRequest,
  handlGetRemainingRequest,
} from "./budgetHandler";

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

  switch (true) {
    case req.url === "/count" && req.method === "POST":
      handleCalculateRequest(req, res);
      break;
    case req.url === "/transactions" && req.method === "GET":
      handleGetTransactionsRequest(req, res);
      break;
    case req.url === "/TotalOfSpending" && req.method === "GET":
      handlecalculateTransactionsRequest(req, res);
      break;
    case req.url === "/remaining" && req.method === "GET":
      handlGetRemainingRequest(req, res);
      break;
    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
      break;
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { server };
