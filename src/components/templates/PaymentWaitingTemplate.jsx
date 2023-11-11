import { Button } from "../atoms/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { pgapprove } from "../../apis/payment";
import CustomModal from "../atoms/CustomModal";
import { getErrorDetail } from "../../layouts/errorswitch";

const PaymentWaitingTemplate = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [failmodalContent, setFailmodalContent] = useState("");

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
    mutationFn: (data) => pgapprove(data),
    onSuccess: (data) => {
      console.log(data.data);
      navigate("/paymentresult", { state: { reservationData: data.data } });
    },
    onError: (error) => {
      const errorDetail = getErrorDetail(error);
      setFailmodalContent(errorDetail);
      setIsModalOpen(true);
      console.error("error:", error);
    },
  });
  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const modalContent = (
    <div className="flex flex-col gap-2">
      <div> 오류가 발생하였습니다.</div>
      <div>{failmodalContent}</div>
    </div>
  );

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
    };

    if (carwashId) {
      approveMutate(approvepostData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="m-4 text-3xl font-semibold">결제 진행 중</div>
      <Button
        variant="long"
        className="fixed bottom-0 left-0"
        onClick={handlePayment}
      >
        결제 완료를 위해 클릭하세요
      </Button>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="오류발생"
        content={modalContent}
        confirmText="홈으로"
      />
    </div>
  );
};
export default PaymentWaitingTemplate;
