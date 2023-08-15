import { useState } from "react";
import { showNotification } from "../services/notificationSlice";
import { useDispatch } from "react-redux";
import { createNewBlog, fetchBlogs } from "../services/blogSlice";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };

    dispatch(createNewBlog(newBlog))
      .then((response) => {
        dispatch(fetchBlogs());
        const message = `A new blog "${response.title}" by ${response.author} has been created.`;
        dispatch(showNotification({ message, type: "success" }));
      })
      .catch((error) => {
        const message = error.response.data.error;
        dispatch(showNotification({ message, type: "error" }));
      });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="absolute">
      <form onSubmit={handleSubmit}>
        <div>
          <div>title</div>
          <input
            className="text-green-950"
            type="text"
            value={title}
            id="form-title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <div>author</div>
          <input
            className="text-green-950"
            value={author}
            type="text"
            id="form-author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <div>url</div>
          <input
            className="text-green-950"
            value={url}
            type="text"
            id="form-url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button
          className="underline text-green-400 hover:text-green-30"
          id="form-submit"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
