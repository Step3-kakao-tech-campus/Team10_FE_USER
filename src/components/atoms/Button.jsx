import React from "react";

export const Button = ({ variant, className, ...props }) => {
  const styles = {
    long: "block w-full h-14 p-4 bg-primary text-white font-semibold rounded-none",
    small: "block w-28 h-14 bg-sky-100 text-sky-500 font-semibold rounded-xl",
    home: "relative flex items-start w-full h-20 bg-white p-4 text-left break-keep overflow-hidden shadow-xl rounded-xl",
    cancel:
      "w-12 h-20 px-2 py-5 rounded-xl items-center text-white text-xs bg-slate-500 ml-auto mr-4",
    review:
      "w-12 h-20 px-2 py-5 rounded-xl items-center text-white text-xs bg-red-400 ml-auto mr-4",
  };

  return (
    <button className={`${styles[variant]} ${className}`} {...props}></button>
  );
};
