import React from "react";

const KeyPointInfo = ({ selectedPoints }) => {
  const keypointToText = {
    1: "하부세차",
    2: "개러지형 독립공간",
    3: "야간조명",
    4: "100% 수돗물",
    5: "휴게실",
    6: "에어컨",
    7: "발수코팅건",
  };

  // 확장> 키포인트 텍스트에 아이콘까지 매핑

  return (
    <div className="grid gap-2 p-4 bg-gray-100 rounded-lg">
      <div className="font-bold">키포인트</div>
      <div className="grid grid-cols-2 gap-2">
        {selectedPoints.map((point, index) => (
          <div className="text-xs" key={index}>
            {keypointToText[point]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyPointInfo;
