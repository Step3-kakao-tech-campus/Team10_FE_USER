import React, { useState } from "react";

const getType = (type) => {
  switch (type) {
    case "unclicked":
      return "flex items-center align-middle w-auto h-6 px-3.5 py-1 leading-normal text-center text-xs font-normal text-black bg-gray-100 rounded-full border border-slate-300";
    case "onclicked":
      return "flex items-center align-middle w-auto h-6 px-3.5 py-1 leading-normal text-center text-xs font-normal text-white bg-primary rounded-full";
    default:
      return "";
  }
};

export const Badge = ({ id, label, onClick }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    if (onClick) {
      onClick(id, !isChecked); // 현재 선택 상태의 반대를 전달
    }
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
