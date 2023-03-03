const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    return res.json(blogs);
  });
});

blogsRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    return res.status(201).json(result);
  });
});

module.exports = blogsRouter;
