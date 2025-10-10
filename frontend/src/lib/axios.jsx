import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", backendUrl);

const axiosInstance = axios.create({
  baseURL: backendUrl + "/api",
  withCredentials: true,
});

export default axiosInstance;
