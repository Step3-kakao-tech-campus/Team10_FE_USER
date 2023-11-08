import React from "react";
import { Suspense } from "react";

import PaymentWaitingTemplate from "../components/templates/PaymentWaitingTemplate.jsx";
const PaymentWaitingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentWaitingTemplate />
    </Suspense>
  );
};

export default PaymentWaitingPage;
