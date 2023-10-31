import React from "react";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import BaySelectionTemplate from "../components/templates/BaySelectionTemplate";
const BaySelectionPage = () => {
  const { carwashId } = useParams(); //string
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BaySelectionTemplate carwashId={carwashId} />
    </Suspense>
  );
};

export default BaySelectionPage;
