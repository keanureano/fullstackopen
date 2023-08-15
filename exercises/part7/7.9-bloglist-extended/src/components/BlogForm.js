import { useState } from "react";
import { showNotification } from "../services/notificationSlice";
import { useDispatch } from "react-redux";

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      const response = await createBlog(newBlog);
      const message = `a new blog ${response.title} by ${response.author}`;
      dispatch(showNotification({ message, type: "success" }));
    } catch (error) {
      const message = error.response.data.error;
      dispatchEvent(showNotification({ errorMessage: message, type: "error" }));
    }
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            value={title}
            id="form-title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            id="form-author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            id="form-url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="form-submit" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
