import ImageCarousel from "../atoms/ImageCarousel";
import StoreInfo from "../atoms/StoreInfo";
import KeyPointInfo from "../atoms/KeyPointInfo";
import { Button } from "../atoms/Button";
import Star from "../atoms/Star";
import { Tab } from "../molecules/Tab";

import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { carwashesInfo } from "../../apis/carwashes";

const CarwashDetailTemplate = ({ carwashId }) => {
  const [detaildata, setData] = useState(null);
  const { data } = useSuspenseQuery({
    queryKey: ["getCarwashesInfo", carwashId], // add location to the dependency list to re-run query if location changes
    queryFn: () => carwashesInfo(carwashId), // Pass location to the getcarwashes_nearby function
    enabled: !!carwashId, // Only run the query when we have carwashid
  });

  useEffect(() => {
    if (data) {
      setData(data?.data?.response);
      console.log(data?.data?.response);
    }
  }, [data]);

  if (!detaildata) {
    return <div>Loading...</div>;
  }

  const images = detaildata.image.map((url) => ({
    label: "Image",
    alt: "image",
    url: url,
  }));

  const weekhour = `평일 ${detaildata?.optime?.weekday.start} ~ ${detaildata?.optime?.weekday.end}`;
  const weekendhour = `주말 ${detaildata?.optime?.weekend.start} ~ ${detaildata?.optime?.weekend.end}`;

  return (
    <div className="relative">
      <div className="flex-grow pb-20 overflow-y-auto">
        {/* 캐러셀 */}
        <ImageCarousel images={images} />
        <div className="p-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              {/* 매장명 */}
              <div className="text-xl font-bold">{detaildata?.name}</div>
              {/* 별점 */}
              <Star
                starcount={parseFloat(detaildata?.rate)}
                reviewcount={parseInt(detaildata?.review_cnt, 10)}
              />
            </div>
            {/* 예약 베이 수 */}
            <div className="flex flex-col">
              <div className="text-3xl font-bold text-center text-sky-500">
                {detaildata?.bayCnt}
              </div>
              <div className="text-sm font-semibold">예약베이</div>
            </div>
          </div>
          {/* 영업 정보 및 탭 메뉴 */}
          <div className="flex flex-col gap-4">
            <StoreInfo
              weekhour={weekhour}
              weekendhour={weekendhour}
              tel={detaildata?.tel}
              address={detaildata?.location.address}
            />
            <KeyPointInfo selectedPoints={detaildata?.keywordId} />
            <Tab introduction={detaildata?.description} />
          </div>
        </div>
      </div>
      <Button type="long" label="예약하기" className="fixed bottom-0" />
    </div>
  );
};

export default CarwashDetailTemplate;
