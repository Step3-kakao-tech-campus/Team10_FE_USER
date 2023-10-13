import React, { useState } from 'react';
import TabInfo from '../atoms/TabInfo';
import TabReview from '../atoms/TabReview';

const introductionText = `
  광주 프리미엄 단독 베이 포세이돈워시 용봉점

  누구의 방해도 받지 않고,
  탱크가 와도 끄떡없는 넓은 베이!
  여름에는 시원하게, 겨울에는 따뜻하게!
  봄에도 미세먼지, 꽃가루, 황사 걱정없는
  포세이돈워시 용봉점에서 쾌적하게 세차를 즐겨주세요!
  전베이 닐스피크 커플러 장착
  24시간 항상 오픈하고 있습니다.

  ★ 베이 안과 화장실에서 흡연은 절대 안됩니다!! ★
  ★ 적발 시 세차사용제한 할 수 있습니다. ★

  ★ 세차 중 연장을 희망하신다면 뽀득뽀득 앱에서 이용해주시길 바랍니다! (뒤에 예약이 있을 시 연장 불가능)
  ★ 뽀득뽀득 앱에서 예약내역 -> 현재 세차중 -> 연장하키 버튼 클릭 -> 30분 단위로 연장
  포세이돈워시 용봉점은 고객짐의 독립적인 시간과 공간을 보장합니다.
  지금 바로 와이퍼 앱으로 예약하세요!

  **** 예약 시 한 베이에 두 대의 차량이 와서 세차를 하시면 안됩니다!

  **** 지인과 함께 예약을 해주시는 고객님들께서는 지점으로 꼭 연락주세요!
  베이를 조정해 드리겠습니다 :)
`;

export const Tab = () => {
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: '정보', content: <TabInfo introduction={introductionText} /> },
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
