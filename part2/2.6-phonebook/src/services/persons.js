import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const get = () => axios.get(baseUrl);

const add = (newPerson) => axios.post(baseUrl, newPerson);

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

const change = (changedPerson) =>
  axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson);

const personService = {
  get,
  add,
  remove,
  change,
};

export default personService;
