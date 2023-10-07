import React from 'react';
import ImageCarousel from '../atoms/ImageCarousel';
import StoreInfo from '../atoms/StoreInfo';
import KeyPointInfo from '../atoms/KeyPointInfo';
import { Tab } from '../atoms/Tab';

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

  return (
    
    <div className='border border-black w-[393px] h-[852px]'>
      {/*세차장 상세정보 페이지*/}
      {/*캐러셀*/}
      <ImageCarousel images={imageData} />
      <div className='flex flex-row justify-center gap-20'>
        <div className='flex flex-col'>
          {/*매장명*/}
          <div className='font-bold text-[22px]'>포세이돈워시 용봉점</div>
          {/*별점 */}
          <div>4.8점 (432)</div>
        </div>
        {/*예약 베이 수 */}
        <div className='flex flex-col'>
          <div className='text-[30px] text-sky-500' font-bold>2</div>
          <div className='text-[12px] font-semibold'>예약베이</div>
        </div>
      </div>
      {/*영업 정보 */}
      <div className='mt-4 flex flex-col gap-4 ml-4'>
        <StoreInfo />
        <KeyPointInfo />
      </div>
      {/* 정보 평가 메뉴*/}
      <div className='mt-2'>
        <Tab/>
      </div>
      
    </div>
  );
};

export default CarwashDetailTemplate;
