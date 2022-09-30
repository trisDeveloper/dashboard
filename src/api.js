import axios from "axios";

const getAPI = axios.create({
  baseURL: "./../../dashboard",
  timeout: 1000,
});

export { getAPI };
