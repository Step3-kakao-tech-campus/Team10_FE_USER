import ReviewPostTemplate from "../components/templates/ReviewPostTemplate";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralErrorBoundary } from "../components/atoms/GeneralErrorBoundary";
import Loader from "../components/atoms/Loader";

const ReviewPostPage = () => {
  const navigate = useNavigate();
  return (
    <GeneralErrorBoundary navigate={navigate}>
      <Suspense fallback={<Loader />}>
        <ReviewPostTemplate />
      </Suspense>
    </GeneralErrorBoundary>
  );
};

export default ReviewPostPage;
