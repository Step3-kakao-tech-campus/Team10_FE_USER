import React, { useEffect, useState } from "react";
import TimeImage from "/StoreInfo/Time.svg";
import Image from "../atoms/Image";
import BayList from "../organisms/BayList";
import { carwashesBays, carwashesInfo } from "../../apis/carwashes";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const BaySelectionTemplate = ({ carwashId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: carwashInfoData } = useQuery({
    queryKey: ["getCarwashesInfo", carwashId],
    queryFn: () => carwashesInfo(carwashId),
    suspense: true,
    enabled: !!carwashId,
  });

  const { data: bayListData } = useQuery({
    queryKey: ["baylists", carwashId],
    queryFn: () => carwashesBays(carwashId),
    enabled: !!carwashId,
  });

  if (!carwashInfoData || !bayListData) {
    return <div>Loading...</div>;
  }

  const detailData = carwashInfoData.data.response.optime;
  const name = carwashInfoData.data.response.name;
  const bayList = bayListData.data.response.bayList;

  const handleBayClick = (bayId) => {
    dispatch({ type: "SET_BAY_ID", payload: bayId });
    navigate(`/schedule/${carwashId}/${bayId}`);
  };

  return (
    <div className="relative p-4">
      <div className="mb-4 text-xl font-bold">{name}: 베이 선택</div>
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
        />
      </div>
    </div>
  );
};

export default BaySelectionTemplate;
