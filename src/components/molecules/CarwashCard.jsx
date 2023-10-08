import React from "react";
import Image from "/RecentCarwashItem/image.png";
import Star from "../atoms/Star";
import DistanceFromHere from "../atoms/DistanceFromHere";

export const CarwashCard = () => {
  return (
    <div className="relative w-auto h-72 bg-gray-400 shadow-xl rounded-xl overflow-hidden">
      <img
        src={Image}
        alt="세차장 사진"
        className="absolute top-0 object-cover"
      />
      <div className="absolute justify-between w-full h-24 bg-white z-50 bottom-0 p-4">
        <div className="wrapper relative">
          <Star starcount="4.4" reviewcount="350" />
          <div>포세이돈워시 용봉점</div>
          <div className="text-sm text-gray-500">광주 북구 설죽로 255</div>
          <DistanceFromHere
            distance="8469"
            className="absolute top-1/2 -translate-y-1/2 right-0"
          />
        </div>
      </div>
    </div>
  );
};
