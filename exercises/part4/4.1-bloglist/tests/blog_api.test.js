const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
jest.setTimeout(10000);

beforeAll(async () => {});

describe("blog api", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blog post unique identifier is named id and not _id", async () => {
    await api.get("/api/blogs").toBeDefined();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
