import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./services/store";
import { createBrowserRouter } from "react-router-dom";
import AuthorView from "./components/AuthorView";
import { RouterProvider } from "react-router-dom";
import Blogs from "./components/Blogs";
import BlogView from "./components/BlogView";
import Author from "./components/Author";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "",
        element: <Blogs />,
      },
      {
        path: "author",
        element: <Author />,
        children: [
          {
            path: ":authorId",
            element: <AuthorView />,
          },
        ],
      },
      {
        path: "blog/:blogId",
        element: <BlogView />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
