import axios from "axios";

export const instance = axios.create({
  timeout: 5000,
  baseURL: "https://k923062c3c512a.user-app.krampoline.com",
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "https://k923062c3c512a.user-app.krampoline.com",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});
