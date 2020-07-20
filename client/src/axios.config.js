import axios from "axios";

export default axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:8080/api/issues",
  headers: {
    "Content-type": "application/json"
  }
});
