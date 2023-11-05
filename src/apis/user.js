import { instance } from "./instance";

export const signup = (data) => {
  const { username, email, password, tel } = data;
  return instance.post("/api/user/join", { username, email, password, tel });
};

export const login = (data) => {
  const { email, password } = data;
  return instance.post("/api/user/login", { email, password });
};
