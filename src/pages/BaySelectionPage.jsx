import React from "react";
import { Suspense } from "react";
import BaySelectionTemplate from "../components/templates/BaySelectionTemplate";
const BaySelectionPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BaySelectionTemplate />
    </Suspense>
  );
};

export default BaySelectionPage;
