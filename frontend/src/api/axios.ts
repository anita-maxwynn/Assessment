import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // Django backend
});

// Attach access token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle expired access token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once to prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");
      if (!refreshToken) {
        // No refresh token → logout
        localStorage.removeItem("access");
        window.dispatchEvent(new Event("authchange"));
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Request new access token
        const res = await axios.post("http://localhost:8000/token/refresh/", {
          refresh: refreshToken,
        });

        localStorage.setItem("access", res.data.access);

        // Update Authorization header and retry original request
        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
        return API(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.dispatchEvent(new Event("authchange"));
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
