import Star from "../atoms/Star";
import DistanceFromHere from "../atoms/DistanceFromHere";

/**
 *
 * @param imgsrc : 세차장 이미지 src storename: 세차장 이름 starcount : star 컴포넌트로 전해줄 것
 * reviewcount : star 컴포넌트로 전해줄 것 priceinfo:세차장 가격 distance : distancefromhere로 전해줄 것
 * @returns
 */
const StoreItem = ({
  imgsrc,
  storename,
  starcount,
  reviewcount,
  priceinfo,
  distance,
}) => {
  // 나중에 클릭 시 이동하는 기능 추가

  return (
    <div className="w-auto h-24 relative bg-white rounded-xl border border-gray-200 flex items-center gap-3.5 ">
      {/* 세차장 사진 부분 */}
      <picture className="flex w-[74px] h-[74px] rounded-xl ml-3">
        <img
          className="w-[74px] h-[74px] rounded-xl"
          src={imgsrc}
          alt="세차장이미지"
        />
      </picture>
      {/* 별점, 세차장이름, 가격정보 부분 */}
      <div className="flex flex-col w-56 h-16 gap-1">
        <Star starcount={starcount} reviewcount={reviewcount} />
        <div className="font-semibold ">{storename}</div>
        <div className="left-0 top-[53px] text-primary text-sm ">
          {priceinfo}
        </div>
      </div>
      {/* DistanceFromHere 컴포넌트 부분 */}
      <DistanceFromHere distance={distance} />
    </div>
  );
};

export default StoreItem;
