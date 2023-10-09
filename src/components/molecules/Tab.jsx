import React, { useState } from 'react';
import TabInfo from '../atoms/TabInfo';
import TabReview from '../atoms/TabReview';

const exampleintroduction = `
  광주 프리미엄 단독 베이 포세이돈워시 용봉점
  누구의 방해도 받지 않고,
  탱크가 와도 끄떡없는 넓은 베이!
  여름에는 시원하게, 겨울에는 따뜻하게!
  봄에도 미세먼지, 꽃가루, 황사 걱정없는
  포세이돈워시 용봉점에서 쾌적하게 세차를 즐겨주세요!
  전베이 닐스피크 커플러 장착
  24시간 항상 오픈하고 있습니다.
`;

export const Tab = () => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '정보', content: <TabInfo introduction={exampleintroduction} /> },
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
