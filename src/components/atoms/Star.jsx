import React from "react";
const Star = ({ starcount = "0.0", reviewcount = "0" }) => {
  return (
    <div className="w-14 h-4 justify-center items-center gap-1 inline-flex">
      <img className="w-3 h-3" src="src\assets\images\star.png" />
      <div className="text-black text-sm font-normal font-['Pretendard']">
        {starcount}
      </div>
      <div className="text-neutral-400 text-sm font-normal font-['Pretendard']">
        ({reviewcount})
      </div>
    </div>
  );
};

export default Star;
