import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "../components/Blog";
import blogService from "../services/blogs";

describe("blog", () => {
  const blog = {
    title: "Title",
    author: "Author",
    url: "Url",
    likes: 0,
    user: { username: "Username" },
  };
  let container;

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container;
  });

  test("should render title and author", () => {
    const blogTitle = container.querySelector(".blog-title");
    const blogAuthor = container.querySelector(".blog-author");
    expect(blogTitle).toBeDefined();
    expect(blogAuthor).toBeDefined();
  });

  test("should not render url and likes", () => {
    const blogUrl = container.querySelector(".blog-url");
    const blogLikes = container.querySelector(".blog-likes");
    expect(blogUrl).toBeNull();
    expect(blogLikes).toBeNull();
  });

  test("should render url and likes when show button is clicked", async () => {
    const blogToggleButton = container.querySelector(".blog-toggle-btn");
    await fireEvent.click(blogToggleButton);
    const blogUrl = container.querySelector(".blog-url");
    const blogLikes = container.querySelector(".blog-likes");
    expect(blogUrl).toBeDefined();
    expect(blogLikes).toBeDefined();
  });
});
