import React from "react";
import UserStar from "../atoms/UserStar";
import DistanceFromHere from "../atoms/DistanceFromHere";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCarwashId } from "../../store/action";

export const CarwashCard = ({
  id,
  image,
  name,
  address,
  rate,
  reviewCount,
  distance,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCarwashId(id));
    navigate(`/carwashdetail/${id}`);
  };

  return (
    <div
      className="relative w-auto overflow-hidden shadow-xl h-72 rounded-xl"
      onClick={handleClick}
    >
      <img src={image} alt={name} className="absolute top-0 object-cover" />
      <div className="absolute bottom-0 justify-between w-full h-24 p-4 bg-white">
        <div className="relative">
          <UserStar averageStar={rate} />
          <div>{name}</div>
          <div className="text-sm text-neutral-500">{address}</div>
          <DistanceFromHere
            distance={distance.toFixed(1)}
            className="absolute right-0 -translate-y-1/2 top-1/2"
          />
        </div>
      </div>
    </div>
  );
};
