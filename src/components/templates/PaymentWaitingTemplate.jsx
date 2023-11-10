import { Button } from "../atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { pgapprove } from "../../apis/payment";

const PaymentWaitingTemplate = () => {
  // useDispatch와 useNavigate를 컴포넌트 최상위에 호출합니다.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pgToken = queryParams.get("pg_token");

  // useSelector를 이용해 store에서 필요한 상태를 가져옵니다.
  const bayId = useSelector((state) => state.selectedBayId);
  const carwashId = useSelector((state) => state.selectedCarwashId);
  const reservations = useSelector((state) => state.reservations);
  const tid = useSelector((state) => state.tid);

  // useMutation 훅을 이용해 결제 승인 로직을 설정합니다.
  const {
    mutate: approveMutate,
    isLoading: approveIsLoading,
    isError: approveIsError,
    error: approveError,
  } = useMutation({
    mutationFn: (data) => pgapprove(carwashId, bayId, data),
    onSuccess: (data) => {
      // 'data' 객체 내부의 'data' 프로퍼티를 '/reservation' 경로로 전달
      console.log(data.data);
      navigate("/paymentresult", { state: { reservationData: data.data } });
    },
    onError: (err) => {
      // 오류 핸들링 로직
      console.error("error:", err);
    },
  });

  // 결제 승인 요청을 처리하는 함수
  const handlePayment = () => {
    // 필요한 데이터를 생성합니다.
    const approvepostData = {
      payApprovalRequestDTO: {
        cid: "TC0ONETIME",
        tid: tid, //나중에 api 수정되면 tid로 받기!
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

    // 컨디션에 따라 결제 승인 요청을 보냅니다.
    if (carwashId) {
      // carwashId와 tid 가 유효한 경우에만 요청
      approveMutate(approvepostData);
    }
  };

  // JSX 리턴
  return (
    <div className="flex flex-col justify-center">
      <div className="text-3xl font-semibold m-4 bg-gray-50">결제 진행 중</div>
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
