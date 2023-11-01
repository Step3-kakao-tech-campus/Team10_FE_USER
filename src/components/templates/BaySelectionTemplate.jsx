import React from "react";
import TimeImage from "/StoreInfo/Time.svg";
import Image from "../atoms/Image";
import BayList from "../organisms/BayList";
import { useEffect, useState } from "react";
import { carwashesBays, carwashesInfo } from "../../apis/carwashes";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BaySelectionTemplate = ({ carwashId }) => {
  const name = "포세이돈워시 용봉점";
  const openingHours = {
    weekday: { start: "00:00", end: "24:00" },
    weekend: { start: "00:00", end: "24:00" },
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCarwashId = useSelector((state) => state.selectedCarwashId);

  const [carwashInfo, baybookInfo] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["getCarwashesInfo", selectedCarwashId],
        queryFn: () => carwashesInfo(selectedCarwashId),
        enabled: !!carwashId,
      },
      {
        queryKey: ["baylists", selectedCarwashId],
        queryFn: () => carwashesBays(selectedCarwashId),
        enabled: !!selectedCarwashId,
      },
    ],
  });
  const detailData = carwashInfo.data.data.response.optime;
  const bayList = baybookInfo.data.data.response.bayList;

  // 세차장별 예약 내역 조회 '/carwashes/{carwash_id}/bays'

  const handleBayClick = (bayId) => {
    dispatch({ type: "SET_BAY_ID", payload: bayId });
    navigate(`/schedule/${selectedCarwashId}/${bayId}`);
  };

  return (
    <div className="relative p-4">
      <div className="mb-4 font-bold">{"<"}</div>
      <div className="mb-4 text-xl font-bold">{name}</div>
      <div className="flex gap-2 mb-4">
        <Image src={TimeImage} alt="영업시간" className="py-1" />
        <div>
          <div>
            평일 {detailData.weekday.start} ~ {detailData.weekday.end}
          </div>
          <div>
            주말 {detailData.weekend.start} ~ {detailData.weekend.end}
          </div>
        </div>
      </div>
      <div>
        <BayList
          bays={bayList}
          openingHours={detailData}
          selectedDate={new Date()}
          onClick={handleBayClick}
          // 여기서 해당 /schdule 링크로 이동해야함 (id값)
        />
      </div>
    </div>
  );
};

export default BaySelectionTemplate;
