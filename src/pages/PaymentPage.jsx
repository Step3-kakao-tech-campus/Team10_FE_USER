import React from "react";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import PaymentTemplate from "../components/templates/PaymentTemplate";
const PaymentPage = () => {
  const { reservationId } = useParams();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentTemplate reservationId={reservationId} />
    </Suspense>
  );
};

export default PaymentPage;
