import Star from "../atoms/Star";
import DistanceFromHere from "../atoms/DistanceFromHere";
import UserStar from "../atoms/UserStar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const StoreItem = ({
  carwashId,
  imgsrc,
  storename,
  starcount,
  priceinfo,
  distance,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: "SET_CARWASH_ID", payload: carwashId });
    navigate(`/carwashdetail/${carwashId}`);
  };

  const imageUrl = imgsrc
    ? imgsrc.url
    : "/CarwashDetail/CarwashImgNotFound.png";

  return (
    <div
      className="relative flex items-center py-2 bg-white border border-gray-300 rounded-xl"
      onClick={handleClick}
    >
      <picture className="ml-8 rounded-xl">
        <img
          className="w-24 h-20 rounded-md"
          src={imageUrl}
          alt="세차장이미지"
        />
      </picture>
      <div className="flex flex-col gap-2 ml-12">
        <UserStar averageStar={starcount} />
        <div className="font-semibold ">{storename}</div>
        <div className="text-primary">30분/{priceinfo}원</div>
      </div>
      <DistanceFromHere
        className="ml-auto mr-4"
        distance={distance.toFixed(1)}
      />
    </div>
  );
};

export default StoreItem;
