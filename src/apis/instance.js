import axios from "axios";

export const instance = axios.create({
  timeout: 5000,
  baseURL: "https://k42de35461f10a.user-app.krampoline.com",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    // if (status === 401) {
    //   //alert("로그인이 필요합니다.");
    //   // window.location.href = "/login";
    // } else if (status === 500) {
    //   //alert("서버에 문제가 발생했습니다");
    //   window.location.href = "/";
    // } else if (error.code === "ECONNABORTED") {
    //   //alert("요청 시간이 초과되었습니다. 잠시 후에 다시 시도해주세요.");
    //   window.location.href = "/";
    // } else {
    //   //alert("네트워크/기타 오류입니다 잠시 후 다시 시도해주세요");
    //   Promise.reject(new Error("기타 에러"), new Error(), status);
    // }
    return Promise.reject(error);
  }
);