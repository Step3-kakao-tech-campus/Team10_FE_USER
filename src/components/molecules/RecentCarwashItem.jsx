import React from "react";
import { Link } from "react-router-dom";

export const RecentCarwashItem = ({
  image,
  carwashId,
  reservationDate,
  carwashName,
}) => {
  return (
    <Link to={`/carwashDetail/${carwashId}`}>
      <div className="w-24">
        <div className="relative w-24 h-24 overflow-hidden rounded-xl bg-slate-600">
          <img
            src={image}
            alt={`${carwashName}} 사진`}
            className="absolute top-0 object-cover w-24 h-24"
          />
        </div>
        <div className="text-xs text-center text-gray-400">
          {reservationDate}
        </div>
        <div className="overflow-hidden text-sm text-center text-gray-700 text-ellipsis whitespace-nowrap">
          {carwashName}
        </div>
      </div>
    </Link>
  );
};
