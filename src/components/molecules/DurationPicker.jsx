import React, { useState } from "react";

const DurationPicker = ({ handleButtonClick }) => {
  const [selectedDuration, setSelectedDuration] = useState();
  const durations = [30, 60, 90, 120, 180, 240];

  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
    handleButtonClick(duration);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {durations.map((duration) => (
          <button
            key={duration}
            onClick={() => handleDurationClick(duration)}
            className={`p-2 border ${
              selectedDuration === duration
                ? "bg-sky-500 text-white"
                : "bg-white"
            } rounded-md cursor-pointer`}
          >
            {duration}분
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationPicker;
