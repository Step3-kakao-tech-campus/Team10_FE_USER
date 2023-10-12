import React, { useState } from "react";

const DatePicker = ({ handleButtonClick }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleClick = (date) => {
    setSelectedDate(date);
    handleButtonClick(date);
  };

  const generateWeekDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const isWeekend = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const weekDates = generateWeekDates();

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex justify-between">
        {weekDates.map((date) => (
          <div
            key={date.toDateString()}
            className="w-10 text-center grid gap-2"
            onClick={() => {
              setSelectedDate(date);
              handleClick(date);
            }}>
            {/* 즉시실행함수(IIFE)로 토요일, 일요일 색상 구분 */}
            {(() => {
              if (isWeekend(date)) {
                if (date.getDay() === 0) {
                  return <div className="text-red-500">일</div>;
                } else {
                  return <div className="text-blue-500">토</div>;
                }
              } else {
                return (
                  <div>
                    {date.toLocaleDateString("ko-KR", { weekday: "short" })}
                  </div>
                );
              }
            })()}
            <div
              className={`${
                selectedDate.toDateString() === date.toDateString()
                  ? "bg-primary text-white rounded-full font-bold w-10 h-10 flex items-center justify-center"
                  : ""
              }`}>
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
