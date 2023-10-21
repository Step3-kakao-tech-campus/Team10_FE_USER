import React from "react";
import dayjs from "dayjs";
import TimeSlot from "../atoms/TimeSlot";

const BayItem = ({ bayNo, bayBookedTime, openingHours, selectedDate }) => {
  const getCurrentHour = () =>
    Math.max(
      dayjs().hour(),
      parseInt(openingHours.weekday.start.split(":")[0])
    );

  const getClosingHour = () => parseInt(openingHours.weekday.end.split(":")[0]);

  const timeIsReserved = (hour, halfHourCheck = false) => {
    return bayBookedTime.some(({ startTime, endTime }) => {
      const checkTime = halfHourCheck
        ? dayjs(selectedDate).hour(hour).minute(30)
        : dayjs(selectedDate).hour(hour).minute(0);

      return (
        checkTime.isAfter(dayjs(startTime)) &&
        checkTime.isBefore(dayjs(endTime))
      );
    });
  };

  const currentHour = getCurrentHour();
  const closingHour = getClosingHour();

  return (
    <div className="py-4 overflow-x-auto border border-gray-300 rounded-xl">
      <div className="p-2 font-semibold">베이 {bayNo}</div>
      <div className="flex justify-center px-4">
        <TimeSlot
          startHour={currentHour}
          endHour={closingHour}
          isReservedCallback={timeIsReserved}
        />
      </div>
    </div>
  );
};

export default BayItem;
