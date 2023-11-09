import { Fragment } from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 rounded-full border-primary border-t-transparent animate-spin-slow"></div>
      <div>로딩 중입니다...</div>
      <div>잠시만 기다려 주세요</div>
    </div>
  );
};

export default Loader;
