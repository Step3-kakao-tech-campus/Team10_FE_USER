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
    mutate: approveMutate, // 결제 승인 요청 함수
    isLoading: approveIsLoading,
    isError: approveIsError,
    error: approveError,
  } = useMutation({
    mutationFn: (data) => pgapprove(carwashId, bayId, data), // 결제 승인 API 함수
    onSuccess: (data) => {
      // 성공 시 작업
      console.log("data:", data);
      // navigate 등의 추가 작업을 여기에서 할 수 있습니다.
    },
    onError: (err) => {
      // 오류 시 작업
      console.error("error:", err);
    },
  });

  // 결제 승인 요청을 처리하는 함수
  const handlePayment = () => {
    // 필요한 데이터를 생성합니다.
    const approvepostData = {
      payApprovalRequestDTO: {
        cid: "TC0ONETIME",
        tid: "T548fd612b8b1abba15f",
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
    <div>
      <div>결제가 진행중입니다....!</div>
      <Button
        variant="long"
        className="fixed bottom-0 left-0"
        onClick={handlePayment}
      >
        결제가 완료되었으면 클릭하세요!
      </Button>
      {/* 오류 메시지 표시 */}
      {approveIsError && <p>오류가 발생했습니다: {approveError?.message}</p>}
      {/* 로딩 상태 표시 */}
      {approveIsLoading && <p>결제 처리 중...</p>}
    </div>
  );
};
export default PaymentWaitingTemplate;
