import axios from "axios";

const API = axios.create({
  baseURL: "https://assessment-twyo.onrender.com", 
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");
      if (!refreshToken) {
        localStorage.removeItem("access");
        window.dispatchEvent(new Event("authchange"));
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post("http://localhost:8000/token/refresh/", {
          refresh: refreshToken,
        });

        localStorage.setItem("access", res.data.access);

        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
        return API(originalRequest);
      } catch (refreshError) {
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
