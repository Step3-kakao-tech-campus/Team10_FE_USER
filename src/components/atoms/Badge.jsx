import React, { useState } from "react";

const getType = (type) => {
  switch (type) {
    case "unclicked":
      return "flex items-center align-middle w-auto h-6 px-3.5 py-1 leading-normal text-center text-xs font-normal text-black bg-slate-200 rounded-full border border-slate-300";
    case "onclicked":
      return "flex items-center align-middle w-auto h-6 px-3.5 py-1 leading-normal text-center text-xs font-normal text-white bg-blue-500 rounded-full";
    default:
      return "";
  }
};

export const Badge = ({ label, ...props }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="field">
      <label
        className={`${isChecked ? getType("onclicked") : getType("unclicked")}`}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={toggleCheckbox}
          className="hidden"
        />
        {label}
      </label>
    </div>
  );
};
