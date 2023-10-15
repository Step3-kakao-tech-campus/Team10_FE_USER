import React, { useState } from "react";

const DurationPicker = ({
  handleButtonClick,
  startTime,
  scheduledTimes = [],
  selectedDate,
  openingHours,
}) => {
  const [selectedDuration, setSelectedDuration] = useState();
  const durations = [30, 60, 90, 120, 180, 240];

  const getFullTime = (time) => {
    if (!selectedDate || !time) return;
    return `${selectedDate.toISOString().split("T")[0]}T${time}:00`;
  };

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
    const startTimeWithDate = new Date(getFullTime(startTime));
    const endTimeWithDate = new Date(getFullTime(getEndTime(duration)));

    // 1. 영업 시간 대조
    const businessEndTime = new Date(
      getFullTime(
        openingHours[
          selectedDate.getDay() === 0 || selectedDate.getDay() === 6
            ? "weekend"
            : "weekday"
        ].end
      )
    );
    if (endTimeWithDate > businessEndTime) {
      return true;
    }

    // 2. 예약된 시간과 대조
    for (let i = 0; i < scheduledTimes.length; i++) {
      const scheduleStart = new Date(scheduledTimes[i].start);
      const scheduleEnd = new Date(scheduledTimes[i].end);

      // 원하는 예약이 예약된 예약 내에 있는지 확인
      if (startTimeWithDate < scheduleEnd && endTimeWithDate > scheduleStart) {
        return true;
      }

      // 원하는 예약이 두 예약된 예약 사이에 있는 경우 유효합니다.
      if (
        i + 1 < scheduledTimes.length &&
        endTimeWithDate <= new Date(scheduledTimes[i + 1].start) &&
        startTimeWithDate >= scheduleEnd
      ) {
        break;
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
