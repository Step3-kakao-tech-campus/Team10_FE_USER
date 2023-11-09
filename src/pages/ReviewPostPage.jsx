import ReviewPostTemplate from "../components/templates/ReviewPostTemplate";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralErrorBoundary } from "../components/atoms/GeneralErrorBoundary";
const ReviewPostPage = () => {
  const navigate = useNavigate();
  return (
    <GeneralErrorBoundary navigate={navigate}>
      <Suspense fallback={<div>Loading...</div>}>
        <ReviewPostTemplate />
      </Suspense>
    </GeneralErrorBoundary>
  );
};

export default ReviewPostPage;
