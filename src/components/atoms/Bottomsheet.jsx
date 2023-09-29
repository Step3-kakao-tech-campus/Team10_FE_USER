import React from "react";

export const Bottomsheet = ({ children }) => {
  return (
    <div className="relative w-96 h-96 p-4 rounded-t-xl bg-white text-black shadow-lg">
      <div className="absolute w-9 h-1 bg-gray-400 rounded-full left-1/2 -translate-x-1/2 top-1.5"></div>
      {children}
    </div>
  );
};
