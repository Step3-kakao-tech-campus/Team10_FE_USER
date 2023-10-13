import React from "react";
import ProfileImg from "/StoreInfo/Profile.svg";
import Photo from "./Photo";
import Star from "./Star";

const ReviewItem = ({ rating, username, date, content }) => {
  return (
    <div className="text-sm p-4 border border-gray-300 justify-center rounded-xl">
      <Star starcount={rating} />
      <div className="flex justify-between">
        <div className="flex flex-items gap-1 font-semibold">
          <Photo src={ProfileImg} alt="닉네임" />
          {username}
        </div>
        <div>{date}</div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default ReviewItem;
