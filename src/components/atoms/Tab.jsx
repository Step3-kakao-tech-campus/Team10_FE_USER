import React, { useState } from 'react';
import TabInfo from './TabInfo';
import TabReview from './TabReview';

export const Tab = () => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '정보', content: '설명' },
    { name: '평가', content: '리뷰' },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  return (
    <>
      <div>
        <ul className="w-[393px] h-[56px] border border-gray-300 bg-gray-300 text-gray-800 font-bold flex flex-row items-center">
          {menuArr.map((el, index) => (
            <li
              className={`w-1/2 p-4 text-center transition duration-500 ${
                index === currentTab ? 'border border-gray-300 bg-white text-black' : 'cursor-pointer'
              }`}
              onClick={() => selectMenuHandler(index)}
              key={index}
            >
              {el.name}
            </li>
          ))}
        </ul>
        <div className="text-center">
          {menuArr[currentTab].content}
        </div>
      </div>
    </>
  );
};
