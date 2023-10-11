import React, { useState } from "react";

const TimePicker = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [isMorningSelected, setIsMorningSelected] = useState(true); 

  const morning = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
    "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  ];

  const afternoon = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
  ];

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="flex flex-wrap gap-2 ">
      <div className="mx-2">
      <div className="flex flex-itemes gap-2">
        <button
          onClick={() => setIsMorningSelected(true)}
          className={`p-2 border ${
            isMorningSelected ? "bg-sky-500 text-white" : "bg-white"
          } rounded-md cursor-pointer`}
        >
          오전
        </button>
        <button
          onClick={() => setIsMorningSelected(false)}
          className={`p-2 border ${
            !isMorningSelected ? "bg-sky-500 text-white" : "bg-white"
          } rounded-md cursor-pointer`}
        >
          오후
        </button>
      </div>
      {isMorningSelected
        ? morning.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeClick(time)}
              className={`p-2 border ${
                selectedTime === time ? "bg-sky-500 text-white" : "bg-white"
              } rounded-md cursor-pointer`}
            >
              {time}
            </button>
          ))
        : afternoon.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeClick(time)}
              className={`p-2 border ${
                selectedTime === time ? "bg-sky-500 text-white" : "bg-white"
              } rounded-md cursor-pointer`}
            >
              {time}
            </button>
          ))}
          
          </div>
      <div className="mt-2 ml-2">
         시작 시간:{" "}
        {selectedTime ? selectedTime : "시작 시간을 선택하세요"}
      </div>
    </div>
  );
};

export default TimePicker;