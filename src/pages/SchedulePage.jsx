import React from "react";
import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ScheduleTemplate from "../components/templates/ScheduleTemplate";
import { GeneralErrorBoundary } from "../components/atoms/GeneralErrorBoundary";
import Loader from "../components/atoms/Loader";

const SchedulePage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 얻습니다.
  const { carwashId, bayId } = useParams(); // useParams 훅을 사용하여 URL 파라미터를 얻습니다.

  return (
    <GeneralErrorBoundary navigate={navigate}>
      <Suspense fallback={<Loader />}>
        <ScheduleTemplate carwashId={carwashId} bayId={bayId} />
      </Suspense>
    </GeneralErrorBoundary>
  );
};

export default SchedulePage;
