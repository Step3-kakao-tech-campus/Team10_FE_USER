import React, { useState, useEffect } from "react";

const DurationPicker = ({
  handleButtonClick,
  startTime,
  bayBookedTimeList,
  selectedDate,
  openingHours,
}) => {
  const [selectedDuration, setSelectedDuration] = useState();
  const durations = [30, 60, 90, 120, 150, 180, 240];
  useEffect(() => {
    setSelectedDuration(null);
  }, [selectedDate, startTime]);
  // 변경
  const getEndTime = (duration) => {
    if (!startTime) return;
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTimeInMinutes = hours * 60 + minutes + duration;
    const endHour = Math.floor(endTimeInMinutes / 60) % 24; // 24시간을 초과하는 시간을 다음 날로 계산
    const endMinute = endTimeInMinutes % 60;
    const koreanEndTime = `${String(endHour).padStart(2, "0")}:${String(
      endMinute
    ).padStart(2, "0")}`;
    return koreanEndTime;
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
    if (currentClosingTime === "24:00" && endHour === 0) {
      return false;
    }
    if (currentClosingTime !== "24:00") {
      if (
        endHour > closingHour ||
        (endHour === closingHour && endMin > closingMin)
      ) {
        return true;
      }
    }
    if (
      endHour > closingHour ||
      (endHour === closingHour && endMin > closingMin)
    ) {
      return true;
    }
    return false;
  };
  const isDurationOverlapping = (duration) => {
    if (!startTime) return true;
    const getDateTime = (time, dayOffset = 0) => {
      const [hours, minutes] = time.split(":").map(Number);
      return new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + dayOffset,
        hours,
        minutes
      );
    };
    const startTimeWithDate = getDateTime(startTime);
    const endTimeString = getEndTime(duration);
    const endTimeWithDate = getDateTime(
      endTimeString,
      endTimeString.includes("(+1 day)") ? 1 : 0
    );
    for (let i = 0; i < bayBookedTimeList.length; i++) {
      const scheduleStart = new Date(bayBookedTimeList[i].startTime);
      const scheduleEnd = new Date(bayBookedTimeList[i].endTime);
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
      <div className="grid w-full grid-cols-4 gap-2">
        {durations.map((duration) => (
          <button
            key={duration}
            onClick={() => handleDurationClick(duration)}
            disabled={
              isEndTimeAfterClosingTime(duration) ||
              isDurationOverlapping(duration)
            }
            className={`p-4 border rounded-xl ${
              selectedDuration === duration
                ? "bg-primary text-white rounded-md"
                : "bg-white rounded-md"
            } ${
              (isEndTimeAfterClosingTime(duration) ||
                isDurationOverlapping(duration)) &&
              "opacity-50 cursor-not-allowed"
            }`}>
            {duration}분
          </button>
        ))}
      </div>
    </div>
  );
};
export default DurationPicker;
