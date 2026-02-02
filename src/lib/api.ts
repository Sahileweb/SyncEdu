import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const path = config.url;

  if (path && path.startsWith("/admin")) {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  }
  if (path && (path.startsWith("/students") || path.startsWith("/student"))) {
    const studentToken = localStorage.getItem("studentToken");
    if (studentToken) {
      config.headers.Authorization = `Bearer ${studentToken}`;
    }
  }
  return config;
});

export default api;