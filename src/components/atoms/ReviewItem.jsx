import React from "react";

const ReviewItem = ({ rating, username, date, content }) => {
  return (
    <div className="review-item border justify-center ml-4 rounded-xl border-gray-300 w-96 h-auto">
      <div className="text-left ml-4 mt-2">별점 {rating} </div>
      <div className="flex items-center ml-4 mt-1 space-x-2">
        <div className="font-semibold">{username}</div>
        <div>{date}</div>
      </div>
      <div className="mt-1 ml-4 text-left">{content}</div>
    </div>
  );
};

export default ReviewItem;
