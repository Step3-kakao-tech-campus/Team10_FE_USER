import React, { useState, useEffect } from "react";

const DurationPicker = ({
  handleButtonClick,
  startTime,
  scheduledTimes = [],
  selectedDate,
  openingHours,
}) => {
  const durations = [30, 60, 90, 120, 180, 240];
  const [selectedDuration, setSelectedDuration] = useState();
  useEffect(() => {
    setSelectedDuration(null);
  }, [selectedDate, startTime]);

  const getEndTime = (duration) => {
    if (!startTime) return;
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTimeInMinutes = hours * 60 + minutes + duration;
    const endHour = Math.floor(endTimeInMinutes / 60) % 24;
    const endMinute = endTimeInMinutes % 60;
    return `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(
      2,
      "0"
    )}`;
  };

  const getMaxEndTime = () => {
    const weekday = [1, 2, 3, 4, 5];
    const dayOfWeek = selectedDate.getDay();

    let endHour;
    if (weekday.includes(dayOfWeek)) {
      [endHour] = openingHours.weekday.end.split(":").map(Number);
    } else {
      [endHour] = openingHours.weekend.end.split(":").map(Number);
    }
    return endHour * 60;
  };

  const isDurationOverlapping = (duration) => {
    if (!startTime) return true;

    const endTime = getEndTime(duration); // Use the already defined function to get the end time
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startTimeInMinutes = startHours * 60 + startMinutes;
    const endTimeInMinutes = endHours * 60 + endMinutes;

    if (endTimeInMinutes > getMaxEndTime()) return true;

    for (let i = 0; i < scheduledTimes.length; i++) {
      const [schedStartHours, schedStartMinutes] = scheduledTimes[i].startTime
        .split("T")[1]
        .split(":")
        .map(Number);
      const schedStartTimeInMinutes = schedStartHours * 60 + schedStartMinutes;

      const [schedEndHours, schedEndMinutes] = scheduledTimes[i].endTime
        .split("T")[1]
        .split(":")
        .map(Number);
      const schedEndTimeInMinutes = schedEndHours * 60 + schedEndMinutes;

      if (
        (startTimeInMinutes >= schedStartTimeInMinutes &&
          startTimeInMinutes < schedEndTimeInMinutes) ||
        (endTimeInMinutes > schedStartTimeInMinutes &&
          endTimeInMinutes <= schedEndTimeInMinutes) ||
        (startTimeInMinutes <= schedStartTimeInMinutes &&
          endTimeInMinutes >= schedEndTimeInMinutes)
      ) {
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
            className={`p-2 border rounded-md ${
              selectedDuration === duration
                ? "bg-primary text-white"
                : "bg-white"
            } ${
              isDurationOverlapping(duration)
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
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
