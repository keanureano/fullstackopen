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

  test("valid blog can be added", async () => {
    const newBlog = {
      title: "New Title",
      author: "New Author",
      url: "https://newurl.com/",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.getBlogs();
    expect(blogs.length).toEqual(helper.initialBlogs.length + 1);
    
    const blogTitles = blogs.map((blog) => blog.title);
    expect(blogTitles).toContain("New Title");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
