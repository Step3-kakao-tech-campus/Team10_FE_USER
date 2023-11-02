import { useState } from "react";
import { Button } from "../atoms/Button";
import Image from "../atoms/Image";
import CustomModal from "../atoms/CustomModal";
import { useMutation } from "@tanstack/react-query";
import { cancelReservation } from "../../apis/reservations";

const ReservationItem = ({
  bayid,
  imgsrc,
  reservetime,
  bayname,
  priceinfo,
  buttontype,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (bayid) => cancelReservation(bayid),
    onSuccess: () => {
      console.log("예약 취소 성공");
      location.reload();
    },
    onError: (error) => {
      console.error("예약 취소 실패 ", error);
    },
  });

  const handleConfirm = () => {
    mutation.mutate(bayid);
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
          className="bg-gray-500 rounded-md"
        >
          예약 취소
        </Button>
      )}
      {buttontype === "review" && (
        <Button variant="long" className="rounded-md">
          리뷰 작성
        </Button>
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
