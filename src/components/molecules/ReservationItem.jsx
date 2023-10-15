import { useState, useRef, useEffect } from "react";
import { Button } from "../atoms/Button";
import CancelSheet from "./CancelSheet";
import Image from "../atoms/Image";

const ReservationItem = ({
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
    <div className="w-auto h-24 relative bg-white rounded-xl border border-gray-200 flex items-center gap-3.5 ">
      {/* 세차장 사진 부분 */}
      <Image
        src={imgsrc}
        className="flex  w-[74px] h-[74px] rounded-xl ml-3"
        alt="세차장 이미지"
      />

      <div className="flex flex-col w-56 h-16 gap-1">
        <div className="text-sm text-gray-400">{reservetime}</div>
        <div className="font-semibold ">{bayname}</div>
        <div className="left-0 top-[53px] text-primary text-sm  ">
          {priceinfo}
        </div>
      </div>

      {buttontype === "cancel" && (
        <Button
          type="cancel"
          onClick={() => setShowCancelSheet(true)}
          label="예약취소"
        />
      )}

      {buttontype === "review" && <Button type="review" label="리뷰 작성" />}

      {showCancelSheet && (
        <div ref={cancelSheetRef} className="fixed left-0 bottom-[60px] z-10">
          <CancelSheet
            reservetime={reservetime}
            bayname={bayname}
            priceinfo={priceinfo}
            className="h-56"
          />
        </div>
      )}
    </div>
  );
};

export default ReservationItem;
