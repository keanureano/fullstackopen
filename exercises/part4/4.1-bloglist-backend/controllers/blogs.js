const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (req, res) => {
  const body = req.body;
  const user = await User.findById(req.user);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });
  const savedBlog = await blog.save();
  const populatedBlog = await savedBlog.populate("user", {
    username: 1,
    name: 1,
  });
  user.blogs = user.blogs.concat(populatedBlog.id);
  await user.save();
  console.log(populatedBlog);
  res.status(201).json(populatedBlog);
});

blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  res.json(updatedBlog);
});

blogsRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(204).end();
  }
  if (blog.user.toString() !== req.user) {
    return res.status(401).json({ error: "unauthorized" });
  }
  await blog.remove();
  res.status(204).end();
});

module.exports = blogsRouter;
