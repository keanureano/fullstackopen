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

describe("viewing blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(helper.initialBlogs.length);
  });

  test("blogs id is not named _id", async () => {
    const blogs = await helper.getBlogs();
    expect(blogs[0].id).toBeDefined();
    expect(blogs[0]._id).toBe(undefined);
  });
});

describe("adding blogs", () => {
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

  test("blog likes defaults to 0 if likes is missing", async () => {
    const missingLikesBlog = {
      title: "New Title",
      author: "New Author",
      url: "https://newurl.com/",
    };

    const response = await api
      .post("/api/blogs")
      .send(missingLikesBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const savedBlog = response.body;
    expect(savedBlog.likes).toBe(0);
  });

  test("blog fails to save if title o url is missing", async () => {
    const missingTitleBlog = {
      author: "New Author",
      url: "https://newurl.com/",
      likes: 0,
    };

    await api.post("/api/blogs").send(missingTitleBlog).expect(400);

    const missingUrlBlog = {
      title: "New Title",
      author: "New Author",
      likes: 0,
    };

    await api.post("/api/blogs").send(missingUrlBlog).expect(400);
  });
});

describe("deleting blogs", () => {
  test("valid blog can be deleted", async () => {
    const blogs = await helper.getBlogs();
    await api.delete(`/api/blogs/${blogs[0].id}`).expect(204);
  });

  test("unkown id will throw 204", async () => {
    const unknownId = "4a422bc61b54a676234d17fc";

    await api.delete(`/api/blogs/${unknownId}`).expect(204);
  });

  test("invalid id will throw 400", async () => {
    const invalidId = "123";
    await api.delete(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("updating blogs", () => {
  test("valid blog can be updated", async () => {
    const blogs = await helper.getBlogs();
    const updatedBlog = { ...blogs[0], likes: blogs[0].likes + 1 };
    const response = await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.likes).toBe(updatedBlog.likes);
  });

  test("invalid blog will throw error", async () => {
    const blogs = await helper.getBlogs();
    const invalidBlog = { ...blogs[0], id: "123", likes: blogs[0].likes + 1 };
    await api.put(`/api/blogs/${invalidBlog.id}`).send(invalidBlog).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
