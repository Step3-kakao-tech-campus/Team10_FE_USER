import React, { forwardRef } from "react";

const TextInput = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`h-12 w-5/6 px-4 rounded-xl border border-gray-300 bg-gray-100 outline-none ${className}`}
      ref={ref}
      {...props}
    ></input>
  );
});

export default TextInput;
