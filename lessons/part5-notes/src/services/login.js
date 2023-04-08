import axios from "axios";
const baseUrl = "/api/login";

const login = async (request) => {
  const response = await axios.post(baseUrl, request);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
