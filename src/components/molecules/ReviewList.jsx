import React from "react";
import ReviewItem from "../atoms/ReviewItem";

const ReviewList = ({ reviews }) => {
  return (
    <div className="m-2">
      {reviews.map((review, index) => (
        <div key={index} className="mb-2">
          <ReviewItem
            rating={review.rating}
            username={review.username}
            date={review.date}
            content={review.content}
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
