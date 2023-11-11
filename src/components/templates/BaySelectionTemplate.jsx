import React from "react";
import TimeImage from "/StoreInfo/Time.svg";
import Image from "../atoms/Image";
import BayList from "../organisms/BayList";
import { carwashesBays, carwashesInfo } from "../../apis/carwashes";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const BaySelectionTemplate = ({ carwashId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [carwashInfoData, baysData] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["getCarwashesInfo", carwashId],
        queryFn: () => carwashesInfo(carwashId),
      },
      {
        queryKey: ["baylists", carwashId],
        queryFn: () => carwashesBays(carwashId),
      },
    ],
  });

  const detailData = carwashInfoData.data.data.response.optime;
  const name = carwashInfoData.data.data.response.name;
  const bayListData = baysData.data.data.response.bayList;

  const handleBayClick = (bayId) => {
    dispatch({ type: "SET_BAY_ID", payload: bayId });
    navigate(`/schedule/${carwashId}/${bayId}`);
  };

  const renderBayContent = () => {
    if (bayListData && bayListData.length > 0) {
      return (
        <BayList
          bays={bayListData}
          openingHours={detailData}
          selectedDate={new Date()}
          onClick={handleBayClick}
        />
      );
    } else {
      return (
        <div className="mt-4 font-bold">
          해당 세차장에는 등록된 베이가 존재하지 않습니다.
        </div>
      );
    }
  };

  return (
    <div className="p-4 grid-4">
      <div className="text-xl font-bold">{name}: 베이 선택</div>
      <div className="flex items-center gap-2 mb-4">
        <Image src={TimeImage} alt="영업시간" className="" />
        <div>
          <div>
            평일 {detailData.weekday.start} ~ {detailData.weekday.end}
          </div>
          <div>
            주말 {detailData.weekend.start} ~ {detailData.weekend.end}
          </div>
        </div>
      </div>
      <div className="font-semibold text-primary">
        원하는 베이를 클릭하여 예약을 진행해보세요
      </div>
      <div className="flex mb-4">
        <div className="flex items-center ml-4">
          <div className="w-3 h-3 mr-2 bg-primary" />
          예약 가능 시간
        </div>
        <div className="flex items-center ml-4">
          <div className="w-3 h-3 mr-2 bg-gray-300" />
          예약된 시간
        </div>
      </div>
      <div>{renderBayContent()}</div>
    </div>
  );
};

export default BaySelectionTemplate;
