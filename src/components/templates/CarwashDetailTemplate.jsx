import React from 'react';
import ImageCarousel from '../atoms/ImageCarousel';
import StoreInfo from '../atoms/StoreInfo';
import KeyPointInfo from '../atoms/KeyPointInfo'; // 추가
import { Tab } from '../molecules/Tab';
import { Button } from '../atoms/Button';

const CarwashDetailTemplate = () => {
  const imageData = [
    {
      label: "Image 1",
      alt: "image1",
      url: "/carouselimage1.jpg",
    },
    {
      label: "Image 2",
      alt: "image2",
      url: "/carouselimage1.jpg",
    },
    {
      label: "Image 3",
      alt: "image3",
      url: "/carouselimage1.jpg",
    },
  ];

  // 예시 키포인트 데이터
  const selectedPoints = ["하부세차", "100% 수돗물", "개러지형 독립공간", "야간 조명", "휴게실", "에어컨", "발수코팅건"];

  return (
      <div className='w-auto h-auto overflow-y-auto'>
        {/* 캐러셀 */}
        <ImageCarousel images={imageData} />
        <div className='flex flex-row justify-between mx-4 my-2'>
          <div className='flex flex-col'>
            {/* 매장명 */}
            <div className='font-bold text-xl'>포세이돈워시 용봉점</div>
            {/* 별점 */}
            <div>4.8점 (432)</div>
          </div>
          {/* 예약 베이 수 */}
          <div className='flex flex-col'>
            <div className='text-2xl font-bold text-center text-sky-500'>2</div>
            <div className='text-sm font-semibold'>예약베이</div>
          </div>
        </div>
        {/* 영업 정보 */}
        <div className='flex flex-col gap-4 mx-4 mt-4'>
          <StoreInfo />
          {/* KeyPointInfo 컴포넌트에 선택된 키포인트 전달 */}
          <KeyPointInfo selectedPoints={selectedPoints} />
        </div>
        {/* 정보 평가 메뉴 */}
        <div className='mt-2'>
          <Tab />
        </div>
        {/* 예약하기 버튼 */}
        <Button type='long' label='예약하기' />
      </div>
      
  );
};

export default CarwashDetailTemplate;
