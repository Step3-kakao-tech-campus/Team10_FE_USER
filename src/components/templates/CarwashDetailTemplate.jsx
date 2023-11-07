import ImageCarousel from "../atoms/ImageCarousel";
import StoreInfo from "../atoms/StoreInfo";
import KeyPointInfo from "../atoms/KeyPointInfo";
import Star from "../atoms/Star";
import { Tab } from "../molecules/Tab";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { carwashesInfo } from "../../apis/carwashes";
import { useNavigate } from "react-router-dom";
import CustomModal from "../atoms/CustomModal";

const CarwashDetailTemplate = ({ carwashId }) => {
  const [detaildata, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["getCarwashesInfo", carwashId],
    queryFn: () => carwashesInfo(carwashId),
    suspense: true,
    enabled: !!carwashId,
    onError: (err) => {
      if (err.response?.status === 404) {
        navigate("/notfound");
      } else if (err.response?.status === 500) {
        setModalContent("서버 오류가 발생했습니다. 홈으로 돌아갑니다.");
        setIsModalOpen(true);
      } else {
        setModalContent("알 수 없는 오류가 발생했습니다.");
        setIsModalOpen(true);
      }
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (data) {
      setData(data?.data?.response);
    }
  }, [data]);

  if (!detaildata) {
    return <div>Loading...</div>;
  }

  const handleReservationClick = () => {
    navigate(`/bayselection/${carwashId}`);
  };

  const images =
    detaildata.imageFiles.length > 0
      ? detaildata.imageFiles.map((url) => ({
          label: "Image",
          alt: "image",
          url: url,
        }))
      : [
          {
            label: "Image Not Found",
            alt: "세차장 등록된 이미지가 없습니다",
            url: "/CarwashDetail/CarwashImgNotFound.png",
          },
        ];

  const weekhour = `평일 ${detaildata?.optime?.weekday.start} ~ ${detaildata?.optime?.weekday.end}`;
  const weekendhour = `주말 ${detaildata?.optime?.weekend.start} ~ ${detaildata?.optime?.weekend.end}`;

  return (
    <div className="relative">
      <div className="flex-grow pb-20 overflow-y-auto">
        <ImageCarousel images={images} />
        <div className="py-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="text-xl font-bold">{detaildata?.name}</div>
              <Star
                starCount={parseFloat(detaildata?.rate)}
                reviewCount={parseFloat(detaildata?.reviewCnt)}
              />
            </div>
            <div className="flex flex-col">
              <div className="text-3xl font-bold text-center text-sky-500">
                {detaildata?.bayCnt}
              </div>
              <div className="text-sm font-semibold">예약베이</div>
            </div>
          </div>
          {/* 영업 정보 및 탭 메뉴 */}
          <div className="flex flex-col gap-4 py-4">
            <StoreInfo
              weekhour={weekhour}
              weekendhour={weekendhour}
              tel={detaildata?.tel}
              address={detaildata?.locationDTO.address}
            />
            <KeyPointInfo selectedPoints={detaildata?.keywordId} />
            <Tab introduction={detaildata?.description} />
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-0 left-0 block w-full p-4 font-semibold text-white h-14 bg-primary"
        onClick={handleReservationClick}
      >
        예약하러 가기
      </button>
      <CustomModal
        isOpen={isModalOpen}
        onConfirm={closeModal}
        title="오류 발생"
        content="오류가 발생했습니다"
        confirmText="확인"
      />
    </div>
  );
};

export default CarwashDetailTemplate;
