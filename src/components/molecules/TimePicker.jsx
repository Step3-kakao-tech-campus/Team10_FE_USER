import React, { useState } from "react";

const TimePicker = ({
  bayId,
  bayNo,
  openingHours,
  handleButtonClick,
  scheduledTimes = [],
  selectedDate,
}) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [isMorningSelected, setIsMorningSelected] = useState(true);

  const bayScheduledTimes =
    scheduledTimes.find((bay) => bay.bayId === bayId && bay.bayNo === bayNo)
      ?.times || [];

  const generateTime = (start, end) => {
    const times = [];
    let [startHour, startMin] = start.split(":").map(Number);
    const [endHour] = end.split(":").map(Number);

    while (startHour < endHour) {
      times.push(
        `${String(startHour).padStart(2, "0")}:${String(startMin).padStart(
          2,
          "0"
        )}`
      );
      if (startMin === 0) startMin = 30;
      else {
        startMin = 0;
        startHour++;
      }
    }
    return times;
  };

  const isScheduled = (time) => {
    return bayScheduledTimes.some((schedule) => {
      const scheduleDate = new Date(schedule.start).toLocaleDateString();
      const selectedDateStr = selectedDate.toLocaleDateString();
      if (scheduleDate !== selectedDateStr) {
        return false;
      }

      let [scheduleStartHour, scheduleStartMin] = schedule.start
        .split("T")[1]
        .split(":")
        .map(Number);
      let [scheduleEndHour, scheduleEndMin] = schedule.end
        .split("T")[1]
        .split(":")
        .map(Number);
      let [checkHour, checkMin] = time.split(":").map(Number);

      const scheduleStartTime = scheduleStartHour * 60 + scheduleStartMin;
      const scheduleEndTime = scheduleEndHour * 60 + scheduleEndMin;
      const checkTime = checkHour * 60 + checkMin;

      return checkTime >= scheduleStartTime && checkTime < scheduleEndTime;
    });
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    handleButtonClick(time);
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0은 일요일, 6은 토요일
  };

  // 현재 영업시간 결정
  const currentOpeningHours = isWeekend(selectedDate)
    ? openingHours.weekend
    : openingHours.weekday;

  const currentHours = isMorningSelected
    ? generateTime(currentOpeningHours.start, "12:00")
    : generateTime("12:00", currentOpeningHours.end);

  return (
    <div className="flex flex-wrap gap-2">
      <div className="mb-2">
        <button
          onClick={() => setIsMorningSelected(true)}
          className={`p-2 border ${
            isMorningSelected ? "bg-primary text-white" : "bg-white"
          } rounded-md cursor-pointer`}
        >
          오전
        </button>
        <button
          onClick={() => setIsMorningSelected(false)}
          className={`p-2 border ${
            !isMorningSelected ? "bg-primary text-white" : "bg-white"
          } rounded-md cursor-pointer`}
        >
          오후
        </button>
      </div>
      <div className="mb-2">
        {currentHours.map((time) => (
          <button
            key={time}
            onClick={() => handleTimeClick(time)}
            disabled={isScheduled(time)}
            className={`w-16 h-12 border rounded-md ${
              selectedTime === time ? "bg-primary text-white" : "bg-white"
            } ${isScheduled(time) && "opacity-50 cursor-not-allowed"}`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
