import React from "react";
import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BaySelectionTemplate from "../components/templates/BaySelectionTemplate";
import { GeneralErrorBoundary } from "../components/atoms/GeneralErrorBoundary";
const BaySelectionPage = () => {
  const { carwashId } = useParams(); //string
  const navigate = useNavigate();
  return (
    <GeneralErrorBoundary navigate={navigate}>
      <Suspense fallback={<div>Loading...</div>}>
        <BaySelectionTemplate carwashId={carwashId} />
      </Suspense>
    </GeneralErrorBoundary>
  );
};

export default BaySelectionPage;
