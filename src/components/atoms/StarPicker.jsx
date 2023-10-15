import React, { useState } from "react";

const checkedStar = "StarPicker\\checkedstar.svg";
const uncheckedStar = "StarPicker\\uncheckedstar.svg";

export const StarPicker = () => {
  const [currentRating, setCurrentRating] = useState(null);

  const handleChange = (rating) => {
    setCurrentRating(rating);
  };

  return (
    <div className="flex items-center justify-center ">
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
              src={
                (currentRating && index < currentRating) ||
                (document.querySelector(`#rating-${index + 1}`) &&
                  document.querySelector(`#rating-${index + 1}`).checked)
                  ? checkedStar
                  : uncheckedStar
              }
              alt={`star ${index + 1}`}
              className="cursor-pointer h-11 w-11"
            />
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};
