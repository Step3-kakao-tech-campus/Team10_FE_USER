import React from "react";
import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ScheduleTemplate from "../components/templates/ScheduleTemplate";

function ErrorFallback({ error }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/error-page");
  }, [navigate]);
}

const SchedulePage = () => {
  const { carwashId, bayId } = useParams(); //string
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div>Loading...</div>}>
        <ScheduleTemplate carwashId={carwashId} bayId={bayId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default SchedulePage;
