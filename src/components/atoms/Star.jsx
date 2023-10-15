import React from "react";
import StarImg from "/StarPicker/checkedstar.svg";
/**
 *
 * @param starcount : 별점, reviewcount : 리뷰수 받아옴
 * @returns 별점 컴포넌트
 */
const Star = ({ starcount = "0.0", reviewcount }) => {
  return (
    <div className="inline-flex items-center h-4 gap-1 w-14">
      <img className="w-3 h-3" src={StarImg} alt="Star" />
      <div className="text-sm text-black">{starcount}</div>
      {reviewcount && (
        <div className="text-sm text-neutral-400">({reviewcount})</div>
      )}
    </div>
  );
};

export default Star;
