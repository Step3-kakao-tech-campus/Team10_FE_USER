import React from "react";

const BayItem = ({ bay_count = 4, scheduledTimes = [] }) => {
  const currentHour = new Date().getHours();

  const isTimeReserved = (time, isHalfHourCheck = false) => {
    const timeInMinutes =
      parseInt(time.split(":")[0]) * 60 +
      parseInt(time.split(":")[1]) +
      (isHalfHourCheck ? 30 : 0);
    return scheduledTimes.some((interval) => {
      const startMinutes =
        parseInt(interval.start.split(":")[0]) * 60 +
        parseInt(interval.start.split(":")[1]);
      const endMinutes =
        parseInt(interval.end.split(":")[0]) * 60 +
        parseInt(interval.end.split(":")[1]);
      return timeInMinutes >= startMinutes && timeInMinutes < endMinutes;
    });
  };

  return (
    <div className="py-4 border border-gray-300 rounded-xl">
      <div className="font-semibold p-2">베이 {bay_count} </div>
      <div className="flex gap-1">
        {Array.from({ length: 24 - currentHour }).map((_, index) => {
          const hour = currentHour + index;
          const time = String(hour).padStart(2, "0") + ":00";
          const isStartReserved = isTimeReserved(time);
          const isHalfReserved = isTimeReserved(time, true);
          return (
            <div
              key={time}
              className="flex flex-col items-center justify-center px-1.5"
            >
              <div className="w-2 h-8 flex flex-col">
                <div
                  className={`flex-grow ${
                    isStartReserved ? "bg-sky-500" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`flex-grow ${
                    isHalfReserved ? "bg-sky-500" : "bg-gray-200"
                  }`}
                ></div>
              </div>
              <div
                className={`text-xs mt-1 ${
                  hour === currentHour ? "text-yellow-500" : "text-gray-500"
                }`}
              >
                {hour}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BayItem;
