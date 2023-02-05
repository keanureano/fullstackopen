/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const dummyNote = {
  id: 10000,
  content: "This note is not saved to server",
  important: true,
};

const baseUrl = "http://localhost:3001/api/notes";
const get = () =>
  axios.get(baseUrl).then((response) => response.data.concat(dummyNote));

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((response) => response.data);

const update = (newObject) =>
  axios
    .put(`${baseUrl}/${newObject.id}`, newObject)
    .then((response) => response.data);

export default { get, create, update };
