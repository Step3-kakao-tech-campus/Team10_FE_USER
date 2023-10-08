import React from "react";

// 선택 시와 선택 안 될 시 세차장 주변 테두리 색상 변경
const getSelected = (selected) => {
  switch (selected) {
    case "selected":
      return "w-14 h-14 absolute border-4 rounded-md border-sky-300";
    case "unselected":
      return "w-14 h-14 absolute border-4 rounded-md border-black";
    default:
      return "";
  }
};
/**
 *
 * @param {picurl: 핀에 등록할 사진의 주소 alt : 대체 텍스트 selected(boolean): 여러 핀 중에 현재 선택되었는지 여부를 알려줌}
 * @returns pin 컴포넌트
 */
export const CarwashPin = ({ picurl = "", selected, alt }) => {
  // 디폴트 주소 추가
  return (
    // 세차장 사진 부분
    <div className="w-14 h-16 relative">
      <div className="w-14 h-14 left-0 top-0 absolute">
        <div
          className={`${
            selected ? getSelected("selected") : getSelected("unselected")
          }`}
        >
          <img
            className="w-12 h-12 left-0 top-0 absolute rounded"
            src={picurl}
          />
        </div>
      </div>

      {/* 핀 이미지 부분 */}
      <div className="w-5 h-6 left-[19px] top-[43px] absolute">
        <img
          className="w-5 h-6  left-0 top-0 absolute"
          src={`${
            selected
              ? "src/assets/images/pin_selected.png"
              : "src/assets/images/pin_unselected.png"
          }`}
        />
      </div>
    </div>
  );
};
