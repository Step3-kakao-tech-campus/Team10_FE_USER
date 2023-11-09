import { instance } from "./instance";

export const signup = (data) => {
  const { username, email, password, tel } = data;
  return instance.post("/api/open/join/user", {
    username,
    email,
    password,
    tel,
  });
};

export const login = (data) => {
  const { email, password } = data;
  return instance.post("/api/open/login/user", { email, password });
};

export const UserInfo = () => {
  return instance.get("/api/common/member/info");
};

export const checkEmail = (email) => {
  return instance.post("/api/open/member/check", { email });
};
