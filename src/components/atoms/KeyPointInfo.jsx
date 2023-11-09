import React from "react";

const KeyPointInfo = ({ selectedPoints }) => {
  const keypointToText = {
    8: "하부세차",
    9: "개러지형 독립공간",
    10: "야간조명",
    11: "100% 수돗물",
    12: "휴게실",
    13: "에어컨",
    14: "발수코팅건",
  };

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
