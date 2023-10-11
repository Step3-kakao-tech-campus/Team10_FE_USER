import React, { useState } from "react";

const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const generateWeekDates = (startDate) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates.map((date) => ({
      date
    }));
  };

  const weekDates = generateWeekDates(currentDate);

  return (
    <div className="bg-gray-100">
    <div className="text-center">
      <div className="mb-4">    
      </div>
      <div className="overflow-x-auto">
        <table className="table-fixed">
          <thead>
            <tr>
              {weekDates.map(({ date }) => (
                <th
                  key={date.toDateString()}
                  className="w-16 px-4 py-2"
                >
                  {date.toLocaleDateString("ko-KR", {
                    weekday: "short",
                  })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekDates.map(({ date}) => (
                <td
                  key={date.toDateString()}
                  onClick={() => handleDateClick(date)}
                  className={`w-auto h-12 text-xl ${
                    selectedDate &&
                    selectedDate.toDateString() === date.toDateString()
                      ? "bg-sky-500 text-white font-bold rounded-full"
                      : ""
                  }`}
                >
                  {date.getDate()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default DatePicker;