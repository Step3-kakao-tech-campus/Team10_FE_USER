import { Suspense } from "react";
import CarwashDetailTemplate from "../components/templates/CarwashDetailTemplate";
const CarwashDetailPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarwashDetailTemplate />
    </Suspense>
  );
};

export default CarwashDetailPage;
