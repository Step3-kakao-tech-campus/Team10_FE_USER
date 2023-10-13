import React from "react";
import ImageCarousel from "../atoms/ImageCarousel";
import StoreInfo from "../atoms/StoreInfo";
import KeyPointInfo from "../atoms/KeyPointInfo";
import { Tab } from "../molecules/Tab";
import { Button } from "../atoms/Button";
import Star from "../atoms/Star";

const CarwashDetailTemplate = ({
  name = "포세이돈 워시 용봉점",
  bayCount = 4,
  starcount = 4.5,
  reviewcount = 432,
  image = [
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
  ],
  selectedPoints = [
    "하부세차",
    "100% 수돗물",
    "개러지형 독립공간",
    "야간 조명",
    "휴게실",
    "에어컨",
    "발수코팅건",
  ],
  introduction = `광주 프리미엄 단독 베이 포세이돈워시 용봉점 누구의 방해도 받지 않고,
    탱크가 와도 끄떡없는 넓은 베이!
    여름에는 시원하게, 겨울에는 따뜻하게!
    봄에도 미세먼지, 꽃가루, 황사 걱정없는
    포세이돈워시 용봉점에서 쾌적하게 세차를 즐겨주세요!
    전베이 닐스피크 커플러 장착
    24시간 항상 오픈하고 있습니다.`,
  // 시간 정보 데이터 변환 필요
  weekhour = "평일 오전 7:00 ~ 오후 11:00",
  weekendhour = "주말 24시간 영업",
  tel = "062-000-0000",
  address = "광주 북구 설죽로 266",
}) => {
  return (
    <div className="relative">
      <div className="flex-grow overflow-y-auto pb-20">
        {/* 캐러셀 */}
        <ImageCarousel images={image} />
        <div className="p-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              {/* 매장명 */}
              <div className="font-bold text-xl">{name}</div>
              {/* 별점 */}
              <Star starcount={starcount} reviewcount={reviewcount} />
            </div>
            {/* 예약 베이 수 */}
            <div className="flex flex-col">
              <div className="text-3xl font-bold text-center text-sky-500">
                {bayCount}
              </div>
              <div className="text-sm font-semibold">예약베이</div>
            </div>
          </div>
          {/* 영업 정보 및 탭 메뉴 */}
          <div className="flex flex-col gap-4">
            <StoreInfo
              weekhour={weekhour}
              weekendhour={weekendhour}
              tel={tel}
              address={address}
            />
            <KeyPointInfo selectedPoints={selectedPoints} />
            <Tab introduction={introduction} />
          </div>
        </div>
      </div>
      <Button type="long" label="예약하기" className="fixed bottom-0" />
    </div>
  );
};

export default CarwashDetailTemplate;
