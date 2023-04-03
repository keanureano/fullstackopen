const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
jest.setTimeout(10000);

const addUser = async () => {
  await User.deleteMany({});
  const username = helper.initialUser.username;
  const passwordHash = await bcrypt.hash(helper.initialUser.password, 10);
  const user = new User({ username, passwordHash });
  await user.save();
};

const addBlogs = async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
};

const getValidBlogId = async () => {
  const response = await api
    .post("/api/blogs")
    .send(helper.initialBlog)
    .set("Authorization", await getToken());
  return response.body.id;
};

const getToken = async () => {
  const login = await api.post("/api/login").send(helper.initialUser);
  return "Bearer " + login.body.token;
};

beforeAll(async () => {
  await addUser();
  await addBlogs();
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
      .set("Authorization", await getToken())
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
      .set("Authorization", await getToken())
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const savedBlog = response.body;
    expect(savedBlog.likes).toBe(0);
  });

  test("blog fails to save if title or url is missing", async () => {
    const missingTitleBlog = {
      author: "New Author",
      url: "https://newurl.com/",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(missingTitleBlog)
      .set("Authorization", await getToken())
      .expect(400);

    const missingUrlBlog = {
      title: "New Title",
      author: "New Author",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(missingUrlBlog)
      .set("Authorization", await getToken())
      .expect(400);
  });

  test("blog fails to save if a token is missing", async () => {
    const missingTokenBlog = {
      title: "New Title",
      author: "New Author",
      url: "https://newurl.com/",
      likes: 0,
    };

    await api.post("/api/blogs").send(missingTokenBlog).expect(400);
  });
});

describe("deleting blogs", () => {
  test("valid blog can be deleted", async () => {
    const validId = await getValidBlogId();
    const token = await getToken();
    await api
      .delete(`/api/blogs/${validId}`)
      .set("Authorization", token)
      .expect(204);
  });

  test("missing token will throw 400", async () => {
    const validId = await getValidBlogId();
    await api.delete(`/api/blogs/${validId}`).expect(400);
  });

  test("invalid token will throw 400", async () => {
    const validId = await getValidBlogId();
    const invalidToken = `test${await getToken()}test`;
    await api
      .delete(`/api/blogs/${validId}`)
      .set("Authorization", invalidToken)
      .expect(400);
  });

  test("unkown id will throw 204", async () => {
    const unknownId = "4a422bc61b54a676234d17fc";

    await api
      .delete(`/api/blogs/${unknownId}`)
      .set("Authorization", await getToken())
      .expect(204);
  });

  test("invalid id will throw 400", async () => {
    const invalidId = "123";
    await api
      .delete(`/api/blogs/${invalidId}`)
      .set("Authorization", await getToken())
      .expect(400);
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
    const response = await api
      .put(`/api/blogs/${invalidBlog.id}`)
      .send(invalidBlog)
      .expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
