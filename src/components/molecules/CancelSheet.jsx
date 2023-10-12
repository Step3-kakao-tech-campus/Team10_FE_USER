import { Bottomsheet } from "../atoms/Bottomsheet";
import { Button } from "../atoms/Button";

const CancelSheet = ({ className, reservetime, bayname, priceinfo }) => {
  return (
    <Bottomsheet className={className}>
      <div className="text-black text-2xl font-bold p-4">
        예약을 취소하시겠습니까?
      </div>
      <div className="flex flex-col w-screen  rounded-lg p-4 bg-slate-200">
        <div className="flex flex-row">
          <div>매장명</div>
          <div className="ml-auto">{bayname}</div>
        </div>
        <div className="flex flex-row">
          <div>예약일정</div>
          <div className="ml-auto">{reservetime}</div>
        </div>
        <div className="flex flex-row">
          <div>취소금액</div>
          <div className="ml-auto">{priceinfo}</div>
        </div>
        <Button type="long" label="취소하기" />
      </div>
    </Bottomsheet>
  );
};
export default CancelSheet;
