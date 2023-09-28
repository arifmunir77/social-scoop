 
import axios from "axios";

const axiosUnSecureInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_BASE_URL,
});

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.headers["Content-Type"] === undefined)
      config.headers["Content-Type"] = "application/json";


    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { axiosUnSecureInstance };

export default axiosInstance;
