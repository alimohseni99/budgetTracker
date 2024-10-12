import http from "http";
import { getBudget, Budget } from "./budget";

const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify(getBudget({ budget: 100, transactions: [10, 20, 30] }))
  );
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
