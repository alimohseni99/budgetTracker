import request from "supertest";
import { server } from "./server";

describe("server testing", () => {
  it("POST count should calculate and return remaining budget", async () => {
    const response = await request(server)
      .post("/count")
      .send({ budget: 100, transactions: [10, 20, 30] })
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.remainings).toBe(40);
  });
  it("GET transactions should return all transactions", async () => {
    const response = await request(server).get("/transactions");

    expect(response.status).toEqual(200);
    expect(response.body.transactions).toEqual([10, 20, 30]);
  });
});
