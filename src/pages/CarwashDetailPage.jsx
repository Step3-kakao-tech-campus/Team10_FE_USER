import { Suspense } from "react";
import { useParams } from "react-router-dom";
import CarwashDetailTemplate from "../components/templates/CarwashDetailTemplate";
import { useNavigate } from "react-router-dom";
import { GeneralErrorBoundary } from "../components/atoms/GeneralErrorBoundary";
import Loader from "../components/atoms/Loader";
const CarwashDetailPage = () => {
  const navigate = useNavigate();
  const { carwashId } = useParams();
  return (
    <GeneralErrorBoundary navigate={navigate}>
      <Suspense fallback={<Loader />}>
        <CarwashDetailTemplate carwashId={carwashId} />
      </Suspense>
    </GeneralErrorBoundary>
  );
};

export default CarwashDetailPage;
