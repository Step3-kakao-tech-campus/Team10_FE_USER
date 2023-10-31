import { Suspense } from "react";
import { useParams } from "react-router-dom";
import CarwashDetailTemplate from "../components/templates/CarwashDetailTemplate";
const CarwashDetailPage = () => {
  const { carwashId } = useParams();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarwashDetailTemplate carwashId={carwashId} />
    </Suspense>
  );
};

export default CarwashDetailPage;
