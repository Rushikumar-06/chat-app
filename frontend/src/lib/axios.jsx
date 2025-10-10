import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL + "/api",
  withCredentials: true,
});

export default axiosInstance;
