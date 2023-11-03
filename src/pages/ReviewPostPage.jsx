import ReviewPostTemplate from "../components/templates/ReviewPostTemplate";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
const ReviewPostPage = () => {
  const { reservationId } = useParams();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewPostTemplate />
    </Suspense>
  );
};

export default ReviewPostPage;
