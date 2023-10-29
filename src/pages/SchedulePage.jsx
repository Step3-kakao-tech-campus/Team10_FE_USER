import React from "react";
import { Suspense } from "react";
import ScheduleTemplate from "../components/templates/ScheduleTemplate";
const SchedulePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleTemplate />
    </Suspense>
  );
};

export default SchedulePage;
