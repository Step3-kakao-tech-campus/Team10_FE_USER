import React, { useState } from "react";

const DurationPicker = ({
  bayId,
  bayNo,
  handleButtonClick,
  startTime,
  scheduledTimes = [],
  selectedDate,
  openingHours,
}) => {
  const [selectedDuration, setSelectedDuration] = useState();
  const durations = [30, 60, 90, 120, 180, 240];

  const bayScheduledTimes =
    scheduledTimes.find((bay) => bay.bayId === bayId && bay.bayNo === bayNo)
      ?.times || [];

  const getEndTime = (duration) => {
    if (!startTime) return;
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTimeInMinutes = hours * 60 + minutes + duration;
    const endHour = Math.floor(endTimeInMinutes / 60);
    const endMinute = endTimeInMinutes % 60;
    return `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(
      2,
      "0"
    )}`;
  };

  const isDurationOverlapping = (duration) => {
    if (!startTime) return true;

    const startTimeWithDate = new Date(
      `${selectedDate.toISOString().split("T")[0]}T${startTime}:00`
    );
    const endTimeWithDate = new Date(
      `${selectedDate.toISOString().split("T")[0]}T${getEndTime(duration)}:00`
    );

    for (let i = 0; i < bayScheduledTimes.length; i++) {
      const scheduleStart = new Date(bayScheduledTimes[i].start);
      const scheduleEnd = new Date(bayScheduledTimes[i].end);

      if (startTimeWithDate < scheduleEnd && endTimeWithDate > scheduleStart) {
        return true;
      }
    }

    return false;
  };

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
            disabled={isDurationOverlapping(duration)}
            className={`p-2 border ${
              selectedDuration === duration
                ? "bg-primary text-white rounded-md"
                : "bg-white rounded-md"
            } ${
              isDurationOverlapping(duration) && "opacity-50 cursor-not-allowed"
            }`}
          >
            {duration}분
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationPicker;
