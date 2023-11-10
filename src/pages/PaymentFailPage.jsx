import React from "react";
import { Button } from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";

const PaymentFailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen  px-4">
      <div className="text-3xl font-semibold mb-8">결제 실패</div>
      <div className="">결제 실패입니다. 잠시 후 다시 시도해주세요.</div>
      <Button
        variant="long"
        className="fixed bottom-0 left-0"
        onClick={() => navigate("/")}
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default PaymentFailPage;
