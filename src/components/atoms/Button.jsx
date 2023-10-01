import React from "react";

export const Button = ({ type = "long", className, label, ...props }) => {
  const getType = (type) => {
    switch (type) {
      case "long":
        return "block w-full h-14 p-4 bg-sky-500 text-white font-semibold rounded-none";
      case "small":
        return "block w-28 h-14 bg-sky-100 text-sky-500 font-semibold rounded-xl";
    }
  };

  return (
    <button
      type="button"
      className={`${getType(type)} ${className}`}
      {...props}>
      {label}
    </button>
  );
};
