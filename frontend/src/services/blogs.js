import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  if (newToken) {
    token = newToken;
  }
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = ({ title, author, url }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const request = axios.post(baseUrl, { title, author, url }, config);
  return request.then((response) => response.data);
};

export default { getAll, create, setToken };
