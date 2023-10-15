import React from "react";
import StarImg from "/StarPicker/checkedstar.svg";
/**
 *
 * @param starcount : 별점, reviewcount : 리뷰수 받아옴
 * @returns 별점 컴포넌트
 */
const Star = ({ starcount = "0.0", reviewcount }) => {
  return (
    <div className="w-14 h-4 items-center gap-1 inline-flex">
      <img className="w-3 h-3" src={StarImg} alt="Star" />
      <div className="text-black text-sm">{starcount}</div>
      {reviewcount && (
        <div className="text-neutral-400 text-sm">({reviewcount})</div>
      )}
    </div>
  );
};

export default Star;
