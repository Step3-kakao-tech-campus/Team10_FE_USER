import React from "react";

const KeyPointInfo = ({ selectedPoints }) => {
  return (
    <div className="grid gap-2 p-4 bg-gray-100 rounded-lg">
      <div className="font-bold">키포인트</div>
      <div className="grid grid-cols-2 gap-2">
        {selectedPoints.map((point, index) => (
          <div className="text-xs" key={index}>
            {point}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyPointInfo;
