import React from "react";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import ScheduleTemplate from "../components/templates/ScheduleTemplate";
const SchedulePage = () => {
  const { carwashId, bayId } = useParams(); //string
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleTemplate carwashId={carwashId} bayId={bayId} />
    </Suspense>
  );
};

export default SchedulePage;
