import { Suspense } from "react";

import ReservationTemplate from "../components/templates/ReservationTemplate";
const ReservationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReservationTemplate />;
    </Suspense>
  );
};
export default ReservationPage;
