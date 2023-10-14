import React from "react";

const getTimeInMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const BayItem = ({ bay_count = 4, scheduledTimes = [], openingHours }) => {
  const currentHour = Math.max(
    new Date().getHours(),
    parseInt(openingHours.weekday.start.split(":")[0])
  );

  const closingHour = parseInt(openingHours.weekday.end.split(":")[0]);

  const isTimeReserved = (hour, isHalfHourCheck = false) => {
    const timeInMinutes =
      getTimeInMinutes(`${String(hour).padStart(2, "0")}:00`) +
      (isHalfHourCheck ? 30 : 0);
    return scheduledTimes.some((interval) => {
      const startMinutes = getTimeInMinutes(interval.start);
      const endMinutes = getTimeInMinutes(interval.end);
      return timeInMinutes >= startMinutes && timeInMinutes < endMinutes;
    });
  };

  return (
    <div className="py-4 border border-gray-300 rounded-xl overflow-x-auto">
      <div className="font-semibold p-2">베이 {bay_count}</div>
      <div className="flex flex-items justify-center">
        {Array.from({ length: closingHour - currentHour }).map((_, index) => {
          const hour = currentHour + index;
          const isStartReserved = isTimeReserved(hour);
          const isHalfReserved = isTimeReserved(hour, true);
          return (
            <div key={hour} className="flex flex-col items-center px-1">
              <div className="w-2 h-8 flex flex-col">
                <div
                  className={`flex-grow ${
                    isStartReserved ? "bg-primary" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`flex-grow ${
                    isHalfReserved ? "bg-primary" : "bg-gray-200"
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
