import http from "http";

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === "Method" && req.url === "/count") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toSTring();
    });

    req.on("end", () => {
      const count = body.split(" ").length;
      res.end(`Count: ${count}`);
    });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
