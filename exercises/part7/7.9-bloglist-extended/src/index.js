import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./services/store";
import { createBrowserRouter } from "react-router-dom";
import Author from "./components/Author";
import { RouterProvider } from "react-router-dom";
import Blogs from "./components/Blogs";
import BlogView from "./components/BlogView";

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
        path: "author/:authorId",
        element: <Author />,
      },
      {
        path: "blog/:blogId",
        element: <BlogView/>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
