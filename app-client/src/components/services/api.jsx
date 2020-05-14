import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default api;
