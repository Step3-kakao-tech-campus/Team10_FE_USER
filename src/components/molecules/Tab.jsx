import React, { useState } from "react";
import TabInfo from "../atoms/TabInfo";
import TabReview from "../atoms/TabReview";

export const Tab = ({ introduction }) => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: "정보", content: <TabInfo introduction={introduction} /> },
    { name: "평가", content: <TabReview /> },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  return (
    <div>
      <ul className="flex items-center font-bold text-gray-800 bg-gray-300">
        {menuArr.map((item, index) => (
          <li
            className={`w-1/2 p-4 text-center transition duration-500 ${
              index === currentTab
                ? "border border-gray-300 bg-white text-black"
                : ""
            }`}
            onClick={() => selectMenuHandler(index)}
            key={index}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div>{menuArr[currentTab].content}</div>
    </div>
  );
};
