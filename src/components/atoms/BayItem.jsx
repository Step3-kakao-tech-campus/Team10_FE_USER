import React from "react";

const BayItem = ({ bayNo, bayBookedTime = [], openingHours, selectedDate }) => {
  const getCurrentHour = () =>
    Math.max(
      new Date().getHours(),
      parseInt(openingHours.weekday.start.split(":")[0])
    );

  const getClosingHour = () => parseInt(openingHours.weekday.end.split(":")[0]);

  const timeIsReserved = (hour, halfHourCheck = false) => {
    return bayBookedTime.some(({ startTime, endTime }) => {
      const [startHour, startMinute] = startTime
        .split("T")[1]
        .split(":")
        .map(Number);
      const [endHour, endMinute] = endTime.split("T")[1].split(":").map(Number);

      const scheduleStartMinutes = startHour * 60 + startMinute;
      const scheduleEndMinutes = endHour * 60 + endMinute;
      const checkTimeMinutes = hour * 60 + (halfHourCheck ? 30 : 0);

      return (
        new Date(startTime).toLocaleDateString() ===
          selectedDate.toLocaleDateString() &&
        checkTimeMinutes >= scheduleStartMinutes &&
        checkTimeMinutes < scheduleEndMinutes
      );
    });
  };

  const currentHour = getCurrentHour();
  const closingHour = getClosingHour();

  return (
    <div className="py-4 border border-gray-300 rounded-xl overflow-x-auto">
      <div className="font-semibold p-2">베이 {bayNo}</div>
      <div className="flex justify-center px-4">
        <div className="flex">
          {Array.from({ length: closingHour - currentHour }).map((_, index) => {
            const hour = currentHour + index;
            const startReserved = timeIsReserved(hour);
            const halfReserved = timeIsReserved(hour, true);

            return (
              <div key={hour} className="flex flex-col items-center px-1">
                <div className="w-2 h-8 flex flex-col">
                  <div
                    className={`flex-grow ${
                      startReserved ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`flex-grow ${
                      halfReserved ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
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
    </div>
  );
};

export default BayItem;
