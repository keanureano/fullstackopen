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

const create = async (request) => {
  const authConfig = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, request, authConfig);
  return response.data;
};

export default { getAll, setToken, create };
