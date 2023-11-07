import React, { useEffect, useState } from "react";
import TimeImage from "/StoreInfo/Time.svg";
import Image from "../atoms/Image";
import BayList from "../organisms/BayList";
import { carwashesBays, carwashesInfo } from "../../apis/carwashes";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomModal from "../atoms/CustomModal";

const BaySelectionTemplate = ({ carwashId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: carwashInfoData, error: carwashInfoError } = useQuery({
    queryKey: ["getCarwashesInfo", carwashId],
    queryFn: () => carwashesInfo(carwashId),
    suspense: true,
    enabled: !!carwashId,
    onError: handleError,
  });

  const { data: bayListData, error: bayListError } = useQuery({
    queryKey: ["baylists", carwashId],
    queryFn: () => carwashesBays(carwashId),
    enabled: !!carwashId,
    onError: handleError,
  });

  const handleError = (err) => {
    const { status } = err.response || {};
    if (status === 401) {
      setModalContent("로그인이 필요합니다.");
      setIsModalOpen(true);
    } else if (status === 500) {
      setModalContent("서버 오류가 발생했습니다. 다시 시도하세요.");
      setIsModalOpen(true);
    } else if (status === 404) {
      navigate("/notfound");
    } else {
      setModalContent("알 수 없는 오류가 발생했습니다.");
      setIsModalOpen(true);
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (carwashInfoError?.response?.status === 401) {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

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
        />
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title={modalContent.includes("서버") ? "오류 발생" : "로그인 필요"}
        content={modalContent}
        confirmText="확인"
      />
    </div>
  );
};

export default BaySelectionTemplate;
