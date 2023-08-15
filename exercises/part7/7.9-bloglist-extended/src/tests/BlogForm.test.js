import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, act } from "@testing-library/react";
import BlogForm from "../components/BlogForm";

describe("blog form", () => {
  test("should call event handler when new blog is created", async () => {
    const newBlog = {
      title: "New Title",
      author: "New Author",
      url: "New Url",
    };
    const createBlogMock = jest.fn((newBlog) => newBlog);
    const showNotifMock = jest.fn();
    const container = render(
      <BlogForm createBlog={createBlogMock} showNotif={showNotifMock} />
    ).container;

    const titleInput = container.querySelector("#blog-title");
    const authorInput = container.querySelector("#blog-author");
    const urlInput = container.querySelector("#blog-url");
    const form = container.querySelector("#blog-form");

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: newBlog.title } });
      fireEvent.change(authorInput, { target: { value: newBlog.author } });
      fireEvent.change(urlInput, { target: { value: newBlog.url } });
      fireEvent.submit(form);
    });

    expect(createBlogMock).toHaveBeenCalledWith(newBlog);
  });
});
