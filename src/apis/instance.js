import axios from "axios";

export const instance = axios.create({
  timeout: 5000,
  baseURL: "https://k92309e2e8ca6a.user-app.krampoline.com",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  console.log(config);
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});
