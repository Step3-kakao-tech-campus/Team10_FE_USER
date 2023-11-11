import ImageCarousel from "../atoms/ImageCarousel";
import StoreInfo from "../atoms/StoreInfo";
import KeyPointInfo from "../atoms/KeyPointInfo";
import Star from "../atoms/Star";
import { Tab } from "../molecules/Tab";
import { useSuspenseQuery } from "@tanstack/react-query";
import { carwashesInfo } from "../../apis/carwashes";
import { useNavigate } from "react-router-dom";
import { Button } from "../atoms/Button";
import StatusBar from "../atoms/StatusBar";

const CarwashDetailTemplate = ({ carwashId }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["getCarwashesInfo", carwashId],
    queryFn: () => carwashesInfo(carwashId),
  });
  const navigate = useNavigate();
  const detailData = data.data.response;

  const weekdayOpeningHours = `평일 ${detailData.optime.weekday.start} ~ ${detailData.optime.weekday.end}`;
  const weekendOpeningHours = `주말 ${detailData.optime.weekend.start} ~ ${detailData.optime.weekend.end}`;

  const images =
    detailData.imageFileList.length > 0
      ? detailData.imageFileList.map((image) => ({
          label: "Image",
          alt: detailData.name,
          url: image.url,
        }))
      : {
          label: "Image Not Found",
          alt: "세차장 등록된 이미지가 없습니다",
          url: "/CarwashDetail/CarwashImgNotFound.png",
        };

  console.log("detailData", detailData);

  return (
    <div className="relative">
      <StatusBar />
      <div className="flex-grow h-screen pb-16 overflow-y-auto">
        <ImageCarousel images={images} />
        <div className="p-4">
          <div className="grid-4">
            <div className="flex justify-between">
              <div>
                <div className="text-xl font-bold">{detailData.name}</div>
                <Star
                  starCount={detailData.rate.toFixed(1)}
                  reviewCount={detailData.reviewCnt}
                />
              </div>
              <div>
                <div className="text-3xl font-bold text-center text-primary">
                  {detailData.bayCnt}
                </div>
                <div className="text-sm font-semibold">예약베이</div>
              </div>
            </div>
            <StoreInfo
              weekhour={weekdayOpeningHours}
              weekendhour={weekendOpeningHours}
              tel={detailData.tel}
              address={detailData.locationDTO.address}
            />
            <KeyPointInfo selectedPoints={detailData.keywordIdList} />
          </div>
        </div>
        <Tab introduction={detailData.description} />
      </div>
      <Button
        variant="long"
        className="fixed bottom-0"
        onClick={() => {
          navigate(`/bayselection/${carwashId}`);
        }}>
        예약하러 가기
      </Button>
    </div>
  );
};

export default CarwashDetailTemplate;
