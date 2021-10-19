import axios from "axios";
// import { apiUrl } from "config";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default instance;
