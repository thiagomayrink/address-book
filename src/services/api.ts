import axios from "axios";
// import { apiUrl } from "config";

const instance = axios.create({
  baseURL: "http://localhost/api",
});

export default instance;
