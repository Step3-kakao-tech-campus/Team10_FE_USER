import { Bottomsheet } from "../atoms/Bottomsheet";
import { Button } from "../atoms/Button";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { cancelReservation } from "../../apis/reservations";

const CancelSheet = ({ className, reservetime, bayname, bayid, priceinfo }) => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data) => {
      return cancelReservation(data);
    },
    onSuccess: () => {
      console.log("success");
      location.reload();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Bottomsheet className={className}>
      <div className="p-4 text-2xl font-bold text-black">
        예약을 취소하시겠습니까?
      </div>
      <div className="flex flex-col w-screen p-4 rounded-lg bg-slate-200">
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
        <Button
          type="cancelreservation"
          className="bg-red-500"
          onClick={() => mutation.mutate(bayid)}
          label="취소하기"
        />
      </div>
    </Bottomsheet>
  );
};
export default CancelSheet;
