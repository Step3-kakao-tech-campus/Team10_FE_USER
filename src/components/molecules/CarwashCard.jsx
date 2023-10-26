import React from "react";
import Image from "/RecentCarwashItem/image.png";
import Star from "../atoms/Star";
import DistanceFromHere from "../atoms/DistanceFromHere";

export const CarwashCard = ({
  image,
  name,
  address,
  rate,
  reviewCount,
  distance,
}) => {
  return (
    <div className="relative w-auto overflow-hidden shadow-xl h-72 rounded-xl">
      <img src={image} alt={name} className="absolute top-0 object-cover" />
      <div className="absolute bottom-0 z-50 justify-between w-full h-24 p-4 bg-white">
        <div className="relative">
          <Star starcount={rate} reviewCount={reviewCount} />
          <div>{name}</div>
          <div className="text-sm text-neutral-500">{address}</div>
          <DistanceFromHere
            distance={distance}
            className="absolute right-0 -translate-y-1/2 top-1/2"
          />
        </div>
      </div>
    </div>
  );
};
