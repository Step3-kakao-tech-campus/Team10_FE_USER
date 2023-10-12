import { useState, useRef, useEffect } from "react";
import { Button } from "../atoms/Button";
import CancelSheet from "./CancelSheet";

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
      <picture className="flex block w-[74px] h-[74px] rounded-xl ml-3">
        <img
          className="w-[74px] h-[74px] rounded-xl"
          src={imgsrc}
          alt="세차장이미지"
        />
      </picture>

      <div className="flex flex-col w-56 h-16 gap-1 block">
        <div className="text-gray-400 text-sm">{reservetime}</div>
        <div className=" text-black text-base font-semibold font-['Pretendard']">
          {bayname}
        </div>
        <div className="left-0 top-[53px] text-sky-500 text-sm font-normal font-['Pretendard'] ">
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
        <div ref={cancelSheetRef} className="fixed left-0 bottom-[60px]">
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
