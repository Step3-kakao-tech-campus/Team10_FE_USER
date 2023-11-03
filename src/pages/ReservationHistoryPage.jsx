import { Suspense } from "react";
import ReservationHistoryTemplate from "../components/templates/ReservationHistoryTemplate.jsx";
const ReservationHistoryPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReservationHistoryTemplate />
    </Suspense>
  );
};

export default ReservationHistoryPage;
