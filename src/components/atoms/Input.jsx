import React from "react";

export const Input = ({ className, placeholder, ...props }) => {
  return (
    <input
      type="text"
      className={`w-auto h-14 bg-gray-100 border border-solid border-gray-500 text-black p-4 rounded-xl outline-none ${className}`}
      placeholder={placeholder}
      {...props}
    ></input>
  );
};
