import React, { useEffect, useState } from "react";

const KeywordReview = ({ keyword, reviewCount, totalReviews }) => {
  const fillPercentage = (reviewCount / totalReviews) * 100;

  return (
    <div className="w-auto p-2 bg-gray-200 text-gray-700 rounded-lg relative flex justify-between items-center">
      <div className="text-black text-sm font-semibold">{keyword}</div>
      <div className="text-sky-500 text-sm font-semibold">{reviewCount}</div>
      <div
        className="absolute h-full bg-primary opacity-20 left-0 top-0 rounded-lg"
        style={{
          width: `${fillPercentage}%`,
        }}
      ></div>
    </div>
  );
};

export default KeywordReview;
