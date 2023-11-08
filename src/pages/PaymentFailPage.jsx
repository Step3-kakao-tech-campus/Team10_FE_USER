import React from "react";
import { Button } from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";

const PaymentFailPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <div>PG 결제 과정에 오류가 발생하였습니다!</div>
      <div>결제를 취소합니다.</div>
      <Button
        variant="long"
        className="fixed bottom-0 left-0"
        onClick={handleClick}
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default PaymentFailPage;
