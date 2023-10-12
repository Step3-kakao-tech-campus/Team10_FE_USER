import React from "react";

const ReviewItem = ({ rating, username, date, content }) => {
  return (
    <div className="text-sm p-4 border border-gray-300 justify-center rounded-xl">
      <div>별점 {rating}</div>
      <div className="flex justify-between">
        <div className="font-semibold">{username}</div>
        <div>{date}</div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default ReviewItem;
