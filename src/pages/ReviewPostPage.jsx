import ReviewPostTemplate from "../components/templates/ReviewPostTemplate";
import { Suspense } from "react";
const ReviewPostPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewPostTemplate />
    </Suspense>
  );
};

export default ReviewPostPage;
