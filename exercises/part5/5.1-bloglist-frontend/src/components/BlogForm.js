import { useState } from "react";

const BlogForm = ({ createBlog, showNotif }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      const response = await createBlog(newBlog);
      const successMessage = `a new blog ${response.title} by ${response.author}`;
      showNotif(successMessage, "success");
    } catch (error) {
      const errorMessage = error.response.data.error;
      showNotif(errorMessage, "error");
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
