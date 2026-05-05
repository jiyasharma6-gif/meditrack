import axios from "axios";

const API = axios.create({
  baseURL: "https://meditrack-backend.onrender.com/api"
});

export default API;
