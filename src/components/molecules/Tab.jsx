import React, { useState } from 'react';
import TabInfo from '../atoms/TabInfo';
import TabReview from '../atoms/TabReview';

export const Tab = ({ introduction }) => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '정보', content: <TabInfo introduction={introduction} /> },
    { name: '평가', content: <TabReview /> },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  return (
    <>
      <div className='mt-4'>
        <ul className="w-full bg-gray-300 text-gray-800 font-bold flex flex-row items-center">
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
