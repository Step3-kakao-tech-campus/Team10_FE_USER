import { instance } from "./instance";

export const join = (data) => {
  const { username, email, password, tel } = data;
  return instance.post("/join/owner", { username, email, password, tel });
};

export const login = (data) => {
  const { email, password } = data;
  return instance.post("/login/owner", { email, password });
};
