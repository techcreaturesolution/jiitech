import axios from "axios";

const baseURL = import.meta.env.MODE === "production" 
  ? "https://jiitech.onrender.com/api" 
  : "/api";

export const serverURL = import.meta.env.MODE === "production" 
  ? "https://jiitech.onrender.com" 
  : "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Attach JWT token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
