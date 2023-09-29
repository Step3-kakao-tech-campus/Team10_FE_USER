import React from "react";

export const Input = ({ placeholder, ...props }) => {
  return (
    <input
      type="text"
      className="w-96 h-14 bg-gray-100 border-2 border-solid border-black text-black p-4 rounded-xl"
      placeholder={placeholder}></input>
  );
};
