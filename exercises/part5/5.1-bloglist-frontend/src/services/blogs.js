import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const authConfig = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, authConfig);
  return response.data;
};

const put = async (blog) => {
  const authConfig = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, authConfig);
  return response.data;
};

export default { getAll, setToken, create, put };
