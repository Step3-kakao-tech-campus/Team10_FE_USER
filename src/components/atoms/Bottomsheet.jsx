import React from "react";

export const Bottomsheet = ({ className, children }) => {
  return (
    <div
      className={`shadow-xl relative w-screen rounded-t-xl bg-white ${className}`}
    >
      {children}
    </div>
  );
};
