import React from "react";

const ReviewItem = ({ rating, username, date, content }) => {
  return (
    <div className="border border-gray-300 justify-center rounded-xl">
      <div className="text-left ml-4 mt-2">별점 {rating} </div>
      <div className="flex flex-items justify-between mx-4 mt-1">
        <div className="font-semibold">{username}</div>
        <div>{date}</div>
      </div>
      <div className="my-2 mx-4 text-left">{content}</div>
    </div>
  );
};

export default ReviewItem;