import React from "react";
import { Suspense } from "react";
import PaymentResultTemplate from "../components/templates/PaymentResultTemplate.jsx";
const PaymentResultPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentResultTemplate />
    </Suspense>
  );
};

export default PaymentResultPage;
