import React from "react";

export const Button = ({ type = "long", label, ...props }) => {
  return (
    <button
      type="button"
      className="block w-96 h-14 p-4 bg-sky-500 text-white font-semibold rounded-none"
      {...props}>
      {label}
    </button>
  );
};
