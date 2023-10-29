import React from "react";
import { Suspense } from "react";
import PaymentTemplate from "../components/templates/PaymentTemplate";
const PaymentPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentTemplate />
    </Suspense>
  );
};

export default PaymentPage;
