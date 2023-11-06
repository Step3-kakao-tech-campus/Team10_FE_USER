import Star from "../atoms/Star";
import DistanceFromHere from "../atoms/DistanceFromHere";
import UserStar from "../atoms/UserStar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 *
 * @param imgsrc : 세차장 이미지 src storename: 세차장 이름 starcount : star 컴포넌트로 전해줄 것
 * reviewcount : star 컴포넌트로 전해줄 것 priceinfo:세차장 가격 distance : distancefromhere로 전해줄 것
 * @returns
 */
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

  return (
    <div
      className="relative flex items-center py-2 bg-white border border-gray-300 rounded-xl"
      onClick={handleClick}
    >
      <picture className="ml-8 rounded-xl">
        <img className="w-24 h-20 rounded-md" src={imgsrc} alt="세차장이미지" />
      </picture>
      <div className="flex flex-col gap-2 ml-12">
        <UserStar averageStar={starcount} />
        <div className="font-semibold ">{storename}</div>
        <div className="text-primary">{priceinfo}</div>
      </div>
      <DistanceFromHere className="ml-auto mr-4" distance={distance} />
    </div>
  );
};

export default StoreItem;
