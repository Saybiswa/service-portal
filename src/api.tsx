import axios from "axios";

const api = axios.create({
  baseURL: "https://service-portal-api.onrender.com",
  withCredentials: true
});

export default api;