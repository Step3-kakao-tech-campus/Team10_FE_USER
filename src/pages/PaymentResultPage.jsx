import React from "react";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import PaymentResultTemplate from "../components/templates/PaymentResultTemplate.jsx";
const PaymentResultPage = () => {
  const { reservationId } = useParams(); //string
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentResultTemplate reservationId={reservationId} />
    </Suspense>
  );
};

export default PaymentResultPage;
