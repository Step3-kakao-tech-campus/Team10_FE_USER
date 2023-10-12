import React, { useEffect, useState } from "react";

const TimePicker = ({ openingHours, handleButtonClick }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [isMorningSelected, setIsMorningSelected] = useState(true);
  const [isTodayWeekend, setIsTodayWeekend] = useState(false);

  const noon = new Date("1970 01 01 12:00:00");

  useEffect(() => {
    if (new Date().getDay() === 0 || new Date().getDay() === 6) {
      setIsTodayWeekend(true);
    }
  }, []);

  const generateTime = (startTime, endTime) => {
    const times = [];
    const startHour = startTime.getHours();
    const endHour = endTime.getHours();
    for (let i = startHour; i < endHour; i++) {
      times.push(i + ":00");
      times.push(i + ":30");
    }
    return times;
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    handleButtonClick(time);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <div>
        <button
          onClick={() => setIsMorningSelected(true)}
          className={`p-2 border ${
            isMorningSelected ? "bg-sky-500 text-white" : "bg-white"
          } rounded-md cursor-pointer`}>
          오전
        </button>
        <button
          onClick={() => setIsMorningSelected(false)}
          className={`p-2 border ${
            !isMorningSelected ? "bg-sky-500 text-white" : "bg-white"
          } rounded-md cursor-pointer`}>
          오후
        </button>
      </div>

      <div>
        {isTodayWeekend
          ? isMorningSelected
            ? generateTime(openingHours.weekendStartTime, noon).map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeClick(time)}
                  className={`w-16 h-12 border rounded-md ${
                    selectedTime === time ? "bg-sky-500 text-white" : "bg-white"
                  }`}>
                  {time}
                </button>
              ))
            : generateTime(noon, openingHours.weekendEndTime).map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeClick(time)}
                  className={`w-16 h-12 border rounded-md ${
                    selectedTime === time ? "bg-sky-500 text-white" : "bg-white"
                  }`}>
                  {time}
                </button>
              ))
          : isMorningSelected
          ? generateTime(openingHours.weekdayStartTime, noon).map((time) => (
              <button
                key={time}
                onClick={() => handleTimeClick(time)}
                className={`w-16 h-12 border rounded-md ${
                  selectedTime === time ? "bg-sky-500 text-white" : "bg-white"
                }`}>
                {time}
              </button>
            ))
          : generateTime(noon, openingHours.weekdayEndTime).map((time) => (
              <button
                key={time}
                onClick={() => handleTimeClick(time)}
                className={`w-16 h-12 border rounded-md ${
                  selectedTime === time ? "bg-sky-500 text-white" : "bg-white"
                }`}>
                {time}
              </button>
            ))}
      </div>
      <div>
        시작 시간: {selectedTime ? selectedTime : "시작 시간을 선택하세요"}
      </div>
    </div>
  );
};

export default TimePicker;
