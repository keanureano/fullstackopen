const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("./blog_api_helper");
const app = require("../app");
const api = supertest(app);
jest.setTimeout(10000);

beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("blog api", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blog id is not named _id", async () => {
    const blogs = await helper.getBlogs();
    expect(blogs[0].id).toBeDefined();
    expect(blogs[0]._id).toBe(undefined);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
