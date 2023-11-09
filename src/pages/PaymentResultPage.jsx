import React from "react";
import { Suspense } from "react";
import PaymentResultTemplate from "../components/templates/PaymentResultTemplate.jsx";
import { GeneralErrorBoundary } from "../components/atoms/GeneralErrorBoundary.jsx";
import { useNavigate } from "react-router-dom";

const PaymentResultPage = () => {
  const navigate = useNavigate();
  return (
    <GeneralErrorBoundary navigate={navigate}>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentResultTemplate />
      </Suspense>
    </GeneralErrorBoundary>
  );
};

export default PaymentResultPage;
