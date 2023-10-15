import React from "react";
import { Button } from "./Button";

export const Bottomsheet = ({ className, children }) => {
  return (
    <div
      className={`shadow-2xl relative w-screen  rounded-t-xl bg-white text-black ${className}`}
    >
      <div className="absolute w-9 h-1 bg-gray-400 rounded-full left-1/2 -translate-x-1/2 top-1.5"></div>
      {children}
      <div className="absolute left-0 bottom-6 w-96"></div>
    </div>
  );
};
