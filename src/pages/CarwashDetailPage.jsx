import { Suspense } from "react";
import { useParams } from "react-router-dom";
import CarwashDetailTemplate from "../components/templates/CarwashDetailTemplate";
import { useNavigate } from "react-router-dom";
import { GeneralErrorBoundary } from "../components/atoms/GeneralErrorBoundary";
const CarwashDetailPage = () => {
  const navigate = useNavigate();
  const { carwashId } = useParams();
  return (
    <GeneralErrorBoundary navigate={navigate}>
      <Suspense fallback={<div>Loading...</div>}>
        <CarwashDetailTemplate carwashId={carwashId} />
      </Suspense>
    </GeneralErrorBoundary>
  );
};

export default CarwashDetailPage;
