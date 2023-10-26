import React from "react";
import StarImg from "/StarPicker/checkedstar.svg";
/**
 *
 * @param starcount : 별점, reviewcount : 리뷰수 받아옴
 * @returns 별점 컴포넌트
 */
const Star = ({ starcount, reviewCount }) => {
  return (
    <div className="flex items-center gap-1">
      <img className="w-3 h-3" src={StarImg} alt="별 아이콘" />
      <div className="text-sm text-black">{starcount}</div>
      <div className="text-sm text-neutral-500">({reviewCount})</div>
    </div>
  );
};

export default Star;
