import React from "react";
import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentTemplate from "../components/templates/PaymentTemplate";
import { GeneralErrorBoundary } from "../components/atoms/GeneralErrorBoundary";
const PaymentPage = () => {
  const navigate = useNavigate();
  return (
    <GeneralErrorBoundary navigate={navigate}>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentTemplate />
      </Suspense>
    </GeneralErrorBoundary>
  );
};

export default PaymentPage;
