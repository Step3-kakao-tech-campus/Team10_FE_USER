import { useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import Image from "../atoms/Image";
import CustomModal from "../atoms/CustomModal";
import { useMutation } from "@tanstack/react-query";
import { cancelReservation } from "../../apis/reservations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ReservationItem = ({
  rsvid,
  carwashid,
  imgsrc,
  reservetime,
  bayname,
  priceinfo,
  buttontype,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(carwashid);
  const handleBayClick = (rsvid, carwashid) => {
    dispatch({ type: "SET_CARWASH_ID", payload: carwashid });
    dispatch({ type: "SET_RESERVATION_ID", payload: rsvid });
    navigate(`/reviewpost`);
  };

  const mutation = useMutation({
    mutationFn: (rsvid) => cancelReservation(rsvid),
    onSuccess: () => {
      console.log("예약 취소 성공");
      location.reload();
    },
    onError: (error) => {
      console.error("예약 취소 실패 ", error);
    },
  });

  const handleConfirm = () => {
    mutation.mutate(rsvid);
    setIsModalOpen(false);
  };

  const modalContent = (
    <div class="flex flex-col gap-2">
      <div> {bayname}</div>
      <div>예약일정:</div>
      <div>{reservetime}</div>
      <div>취소 금액: {priceinfo}</div>
    </div>
  );

  return (
    <div className="pt-2 mb-4 border border-gray-300 rounded-md">
      <div className="flex items-center justify-between p-4">
        <Image
          src={imgsrc}
          className="w-20 h-20 mr-8 rounded-md"
          alt="세차장 이미지"
        />
        <div className="flex flex-col flex-grow gap-2">
          <div className="mt-2 text-sm">{reservetime}</div>
          <div className="font-semibold">{bayname}</div>
          <div className="font-bold text-right text-primary">{priceinfo}</div>
        </div>
      </div>
      {buttontype === "cancel" && (
        <Button
          variant="long"
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 rounded-md "
        >
          예약 취소
        </Button>
      )}
      {buttontype === "review" && (
        <Button
          variant="long"
          className="rounded-md"
          onClick={() => handleBayClick(rsvid, carwashid)}
        >
          리뷰 작성
        </Button>
        //<button onClick={handleBayClick(rsvid, carwashid)}>리뷰 작성 </button>
      )}
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="예약 취소 확인"
        content={modalContent}
        confirmText="취소하기"
        cancelText="닫기"
      />
    </div>
  );
};

export default ReservationItem;
