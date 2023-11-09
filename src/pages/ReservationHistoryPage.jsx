import { Suspense } from "react";
import ReservationHistoryTemplate from "../components/templates/ReservationHistoryTemplate.jsx";
import { GeneralErrorBoundary } from "../components/atoms/GeneralErrorBoundary.jsx";
import { useNavigate } from "react-router-dom";
const ReservationHistoryPage = () => {
  const navigate = useNavigate();
  return (
    <GeneralErrorBoundary navigate={navigate}>
      <Suspense fallback={<div>Loading...</div>}>
        <ReservationHistoryTemplate />
      </Suspense>
    </GeneralErrorBoundary>
  );
};

export default ReservationHistoryPage;
