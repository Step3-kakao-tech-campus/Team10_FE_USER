import React, { useState } from "react";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

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

  const weekDates = generateWeekDates();

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex justify-between">
        {weekDates.map((date) => (
          <div 
            key={date.toDateString()} 
            className="px-4 py-2 text-center cursor-pointer"
            onClick={() => setSelectedDate(date)}
          >
            <div className="mb-4">{date.toLocaleDateString("ko-KR", { weekday: "short" })}</div>
            <div 
              className={`${
                selectedDate && selectedDate.toDateString() === date.toDateString()
                  ? "bg-sky-500 text-white mt-2 rounded-full font-bold mt-2rounded-full w-10 h-10 flex items-center justify-center"
                  : ""
              }`}
            >
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;