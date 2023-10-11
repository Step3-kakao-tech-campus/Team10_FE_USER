import React from "react";

export const Button = ({
  type = "long",
  className,
  onClick,
  label,
  icon,
  ...props
}) => {
  const getType = (type) => {
    switch (type) {
      case "long":
        return "block w-full h-14 p-4 bg-sky-500 text-white font-semibold rounded-none";
      case "small":
        return "block w-28 h-14 bg-sky-100 text-sky-500 font-semibold rounded-xl";
      case "home":
        return "relative flex items-start w-full h-20 bg-white p-4 text-left break-keep overflow-hidden shadow-xl rounded-xl";
      case "action":
        return "w-12 h-20 px-2 py-5 rounded-xl items-center text-white text-xs";
    }
  };

  return (
    <button
      type="button"
      className={`${getType(type)} ${className}`}
      onClick={onClick}
      {...props}
    >
      <img src={icon} className="absolute right-0 top-8" />
      {label}
    </button>
  );
};
