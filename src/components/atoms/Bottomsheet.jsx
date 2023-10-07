import React from "react";
import { Button } from "./Button";

export const Bottomsheet = ({ className, children }) => {
  return (
    <div
      className={`relative w-96 h-96 p-4 rounded-t-xl bg-white text-black shadow-lg ${className}`}>
      <div className="absolute w-9 h-1 bg-gray-400 rounded-full left-1/2 -translate-x-1/2 top-1.5"></div>
      {children}
      <div className="absolute bottom-6 left-0 w-96">
        <Button label="로그인" />
      </div>
    </div>
  );
};
