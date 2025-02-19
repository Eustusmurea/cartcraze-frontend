// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// export const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         "Content-Type": "application/json",
//     }
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });


import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Unauthorized Access
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);
