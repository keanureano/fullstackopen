import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";

describe("blog", () => {
  let container;

  beforeEach(() => {
    const blog = { title: "Title", author: "Author", url: "Url", likes: 0 };
    container = render(<Blog blog={blog} />).container;
  });

  test("renders title and author", () => {
    const blogTitle = container.querySelector(".blog-title");
    const blogAuthor = container.querySelector(".blog-author");
    expect(blogTitle).toBeDefined();
    expect(blogAuthor).toBeDefined();
  });

  test("doesn't render url and likes", () => {
    const blogUrl = container.querySelector(".blog-url");
    const blogLikes = container.querySelector(".blog-likes");
    expect(blogUrl).toBeNull();
    expect(blogLikes).toBeNull();
  });
});
