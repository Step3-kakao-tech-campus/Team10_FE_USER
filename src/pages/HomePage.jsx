import { Suspense } from "react";
import HomeTemplate from "../components/templates/HomeTemplate";
import { GeneralErrorBoundary } from "../components/atoms/GeneralErrorBoundary";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <GeneralErrorBoundary navigate={navigate}>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeTemplate location={location} />
      </Suspense>
    </GeneralErrorBoundary>
  );
};
