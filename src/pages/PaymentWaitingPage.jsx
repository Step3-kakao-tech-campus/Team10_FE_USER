import React from "react";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralErrorBoundary } from "../components/atoms/GeneralErrorBoundary.jsx";

import PaymentWaitingTemplate from "../components/templates/PaymentWaitingTemplate.jsx";
const PaymentWaitingPage = () => {
  const navigate = useNavigate();
  return (
    <GeneralErrorBoundary navigate={navigate}>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentWaitingTemplate />
      </Suspense>
    </GeneralErrorBoundary>
  );
};

export default PaymentWaitingPage;
