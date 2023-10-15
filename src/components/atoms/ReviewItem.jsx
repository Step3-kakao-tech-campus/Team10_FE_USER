import React from "react";
import ProfileImg from "/StoreInfo/Profile.svg";
import Image from "./Image";
import Star from "./Star";

const ReviewItem = ({ rating, username, date, content }) => {
  return (
    <div className="justify-center p-4 text-sm border border-gray-300 rounded-xl">
      <Star starcount={rating} />
      <div className="flex justify-between">
        <div className="flex gap-1 font-semibold flex-items">
          <Image src={ProfileImg} alt="닉네임" />
          {username}
        </div>
        <div>{date}</div>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default ReviewItem;
