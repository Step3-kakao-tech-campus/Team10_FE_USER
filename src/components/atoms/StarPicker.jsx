import React, { useState } from "react";

const checkedStar = "StarPicker\\checkedstar.svg";
const uncheckedStar = "StarPicker\\uncheckedstar.svg";

export const StarPicker = ({ onRate }) => {
  const [currentRating, setCurrentRating] = useState(0);

  const handleChange = (rating) => {
    setCurrentRating(rating);
    if (onRate) {
      onRate(rating); // 새로운 별점을 상위 컴포넌트에 전달
    }
  };

  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <React.Fragment key={index}>
          <input
            className="sr-only"
            type="radio"
            id={`rating-${index + 1}`}
            name="rating"
            value={index + 1}
            onChange={() => handleChange(index + 1)}
          />
          <label htmlFor={`rating-${index + 1}`}>
            <img
              src={currentRating > index ? checkedStar : uncheckedStar}
              alt={`star ${index + 1}`}
              className="cursor-pointer h-11 w-11"
            />
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};
