import { Button } from "../atoms/Button";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { pgapprove } from "../../apis/payment";

const PaymentWaitingTemplate = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pgToken = queryParams.get("pg_token");

  const bayId = useSelector((state) => state.reservationProcess.selectedBayId);
  const carwashId = useSelector(
    (state) => state.reservationProcess.selectedCarwashId
  );
  const reservations = useSelector(
    (state) => state.reservationProcess.reservations
  );
  const tid = useSelector((state) => state.reservationProcess.tid);

  const {
    mutate: approveMutate,
    isLoading: approveIsLoading,
    isError: approveIsError,
    error: approveError,
  } = useMutation({
    mutationFn: (data) => pgapprove(carwashId, bayId, data),
    onSuccess: (data) => {
      console.log(data.data);
      navigate("/paymentresult", { state: { reservationData: data.data } });
    },
    onError: (err) => {
      console.error("error:", err);
    },
  });

  const handlePayment = () => {
    const approvepostData = {
      payApprovalRequestDTO: {
        cid: "TC0ONETIME",
        tid: tid,
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        pg_token: pgToken,
      },
      saveDTO: {
        bayId: bayId,
        startTime: reservations.startTime,
        endTime: reservations.endTime,
      },
      carwashId: carwashId,
      bayId: bayId,
    };

    if (carwashId) {
      approveMutate(approvepostData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-4 text-3xl font-semibold bg-gray-50">결제 진행 중</div>
      {approveIsError && (
        <div>오류가 발생했습니다 : {approveError?.message}</div>
      )}

      {approveIsLoading && <div>처리 중</div>}

      <Button
        variant="long"
        className="fixed bottom-0 left-0"
        onClick={handlePayment}
      >
        결제 완료를 위해 클릭하세요
      </Button>
    </div>
  );
};
export default PaymentWaitingTemplate;
