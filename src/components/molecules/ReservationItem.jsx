import { useState, useRef, useEffect } from "react";
import { Button } from "../atoms/Button";
import CancelSheet from "./CancelSheet";
import Image from "../atoms/Image";

const ReservationItem = ({
  bayid,
  imgsrc,
  reservetime,
  bayname,
  priceinfo,
  buttontype,
}) => {
  const [showCancelSheet, setShowCancelSheet] = useState(false);
  const cancelSheetRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // CancelSheet가 열려 있고 클릭이 CancelSheet 외부에서 발생한 경우
      if (
        showCancelSheet &&
        cancelSheetRef.current &&
        !cancelSheetRef.current.contains(event.target)
      ) {
        setShowCancelSheet(false);
      }
    };

    // 이벤트 리스너 추가하기
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // 정리 - 컴포넌트가 언마운트될 때 이벤트 리스너 제거하기
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCancelSheet]);

  return (
    <div className="flex justify-between py-4 overflow-x-auto border border-gray-300 rounded-xl">
      <Image src={imgsrc} className="w-24 h-16 m-2 " alt="세차장 이미지" />
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-500">{reservetime}</div>
        <div>{bayname}</div>
        <div className="text-right text-primary">{priceinfo}</div>
      </div>
      <div>
        {buttontype === "cancel" && (
          <Button variant="cancel" onClick={() => setShowCancelSheet(true)}>
            예약 취소
          </Button>
        )}
      </div>
      {buttontype === "review" && <Button variant="review"> 리뷰 작성 </Button>}

      {showCancelSheet && (
        <div ref={cancelSheetRef} className="fixed left-0 bottom-[60px] z-10">
          <CancelSheet
            reservetime={reservetime}
            bayname={bayname}
            bayid={bayid}
            priceinfo={priceinfo}
            className="h-56"
          />
        </div>
      )}
    </div>
  );
};

export default ReservationItem;
