import React from "react";

const KeyPointInfo = ({ selectedPoints }) => {
  return (
    <div className="bg-gray-100 rounded-lg">
        <div className='font-bold text-left ml-4 mt-2'>키포인트</div>
      <div className="grid grid-cols-2 gap-2 ml-4 my-2">
        {selectedPoints.map((point, index) => (
          <div key={index}>{point}</div>
        ))}
      </div>
    </div>
  );
};

export default KeyPointInfo;

