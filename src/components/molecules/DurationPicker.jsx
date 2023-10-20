import React, { useState, useEffect } from "react";

const DurationPicker = ({
  handleButtonClick,
  startTime,
  bayBookedTime,
  selectedDate,
  openingHours,
}) => {
  const [selectedDuration, setSelectedDuration] = useState();
  const durations = [30, 60, 90, 120, 150, 180, 240];

  useEffect(() => {
    setSelectedDuration(null);
  }, [selectedDate, startTime]);

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

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const currentClosingTime = isWeekend(selectedDate)
    ? openingHours.weekend.end
    : openingHours.weekday.end;

  const isEndTimeAfterClosingTime = (duration) => {
    if (!startTime) return true;
    const endTime = getEndTime(duration);
    let [endHour, endMin] = endTime.split(":").map(Number);
    let [closingHour, closingMin] = currentClosingTime.split(":").map(Number);

    if (currentClosingTime !== "24:00") {
      if (
        endHour > closingHour ||
        (endHour === closingHour && endMin > closingMin)
      ) {
        return true;
      }
    }

    return false;
  };

  const isDurationOverlapping = (duration) => {
    if (!startTime) return true;

    const startTimeWithDate = new Date(
      `${selectedDate.toISOString().split("T")[0]}T${startTime}:00`
    );
    const endTimeWithDate = new Date(
      `${selectedDate.toISOString().split("T")[0]}T${getEndTime(duration)}:00`
    );

    for (let i = 0; i < bayBookedTime.length; i++) {
      const scheduleStart = new Date(bayBookedTime[i].startTime);
      const scheduleEnd = new Date(bayBookedTime[i].endTime);

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
            disabled={
              isEndTimeAfterClosingTime(duration) ||
              isDurationOverlapping(duration)
            }
            className={`p-2 border ${
              selectedDuration === duration
                ? "bg-primary text-white rounded-md"
                : "bg-white rounded-md"
            } ${
              (isEndTimeAfterClosingTime(duration) ||
                isDurationOverlapping(duration)) &&
              "opacity-50 cursor-not-allowed"
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
