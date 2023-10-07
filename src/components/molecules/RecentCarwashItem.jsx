import React from "react";
import { Link } from "react-router-dom";

export const RecentCarwashItem = ({
  image,
  carwashId,
  reservationDate,
  storeName,
}) => {
  return (
    <Link to={`/carwashDetail/${carwashId}`}>
      <div className="w-24">
        <div className="relative w-24 h-24 rounded-xl bg-slate-600 overflow-hidden">
          <img
            src={image}
            alt={`${storeName} 사진`}
            className="absolute top-0 w-24 h-24 object-cover"
          />
        </div>
        <div className="text-xs text-gray-400 text-center">
          {reservationDate}
        </div>
        <div className="text-sm text-gray-700 text-center text-ellipsis whitespace-nowrap overflow-hidden">
          {storeName}
        </div>
      </div>
    </Link>
  );
};
