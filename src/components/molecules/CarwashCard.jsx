import React from "react";
import Image from "/RecentCarwashItem/image.png";
import Star from "../atoms/Star";
import DistanceFromHere from "../atoms/DistanceFromHere";

export const CarwashCard = () => {
  return (
    <div className="relative w-auto overflow-hidden bg-gray-400 shadow-xl h-72 rounded-xl">
      <img
        src={Image}
        alt="세차장 사진"
        className="absolute top-0 object-cover"
      />
      <div className="absolute bottom-0 z-50 justify-between w-full h-24 p-4 bg-white">
        <div className="relative wrapper">
          <Star starcount="4.4" reviewcount="350" />
          <div>포세이돈워시 용봉점</div>
          <div className="text-sm text-gray-500">광주 북구 설죽로 255</div>
          <DistanceFromHere
            distance="8469"
            className="absolute right-0 -translate-y-1/2 top-1/2"
          />
        </div>
      </div>
    </div>
  );
};
