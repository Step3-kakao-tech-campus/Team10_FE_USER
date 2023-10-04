/**
 *
 * @param {distance : 현재 위치 기준으로 받아온 세차장까지의 거리(km)}
 * @returns distancefromhere 컴포넌트
 */
const DistanceFromHere = ({ distance = "100" }) => {
  return (
    <div className="w-11 h-11 relative">
      <div className="w-6 h-6 left-[9px] top-0 absolute flex-col justify-start items-start inline-flex">
        <img
          className="w-6 h-6 absolute"
          src="src\assets\images\location.png"
        />
      </div>
      <div className="left-0 top-[27px] absolute text-center text-zinc-600 text-base font-normal font-['Pretendard']">
        {distance}km
      </div>
    </div>
  );
};
export default DistanceFromHere;
