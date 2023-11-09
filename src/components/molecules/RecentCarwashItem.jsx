import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCarwashId } from "../../store/action";

export const RecentCarwashItem = ({
  image,
  carwashId,
  reservationDate,
  carwashName,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemClick = () => {
    dispatch(setCarwashId(carwashId));
    navigate(`/carwashdetail/${carwashId}`);
  };

  return (
    <div className="w-24" onClick={handleItemClick}>
      <div className="relative w-24 h-24 overflow-hidden rounded-xl bg-slate-600">
        {image ? (
          <img
            src={image.url}
            alt={`${carwashName} 사진`}
            className="absolute top-0 object-cover w-24 h-24"
          />
        ) : (
          <div className="absolute top-0 flex items-center justify-center w-24 h-24 text-gray-400">
            이미지 없음
          </div>
        )}
      </div>
      <div className="text-xs text-center text-gray-400">{reservationDate}</div>
      <div className="overflow-hidden text-sm text-center text-gray-700 text-ellipsis whitespace-nowrap">
        {carwashName}
      </div>
    </div>
  );
};
