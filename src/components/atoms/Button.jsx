import React from "react";

export const Button = ({ variant, className, children, ...props }) => {
  const styles = {
    long: "block w-full h-14 p-4 bg-primary text-white font-semibold active:brightness-75",
    small: "block w-28 h-14 bg-sky-100 text-sky-500 font-semibold rounded-xl",
    home: "relative flex items-start w-full h-20 bg-white p-4 text-left break-keep overflow-hidden shadow-xl rounded-xl",
    cancel: "w-16 h-12 px-4 bg-red-500 text-white text-sm  rounded-md",
    review: "w-16 h-12 px-4 bg-primary text-white text-sm  rounded-md",
    checkemail: "bg-primary text-white rounded-lg w-28 font-semibold",
  };

  return (
    <button className={`${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
