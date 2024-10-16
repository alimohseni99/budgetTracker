import request from "supertest";
import { server } from "./server";

describe("server testing", () => {
  it("POST count should calculate and return remaining budget", async () => {
    const response = await request(server)
      .post("/count")
      .send({ budget: 100, expenses: [10, 20, 30] })
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.remainings).toBe(40);
  });
  it("GET expenses should return all expenses", async () => {
    const response = await request(server).get("/expenses");

    expect(response.status).toEqual(200);
    expect(response.body.expenses).toEqual([10, 20, 30]);
  });
  it("GET TotalOfSpending should return total of all expenses", async () => {
    const response = await request(server).get("/TotalOfSpending");

    expect(response.status).toEqual(200);
    expect(response.body.total).toBe(60);
  });

  it("GET remaining should return the remaining budget", async () => {
    const response = await request(server).get("/remaining");

    expect(response.status).toEqual(200);
    expect(response.body.remaining).toBe(40);
  });
});
