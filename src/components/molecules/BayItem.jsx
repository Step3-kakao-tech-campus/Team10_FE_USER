import React from "react";
import dayjs from "dayjs";
import TimeSlot from "../atoms/TimeSlot";

const BayItem = ({
  bayId,
  bayNo,
  bayBookedTimeList,
  openingHours,
  selectedDate,
  onClick,
}) => {
  const isWeekend =
    dayjs(selectedDate).day() === 0 || dayjs(selectedDate).day() === 6;

  const openingHoursData = isWeekend
    ? openingHours.weekend
    : openingHours.weekday;

  const getCurrentHour = () =>
    Math.max(dayjs().hour(), parseInt(openingHoursData.start.split(":")[0]));

  const getClosingHour = () => parseInt(openingHoursData.end.split(":")[0]);

  const timeIsReserved = (hour, halfHourCheck = false) => {
    return bayBookedTimeList.some(({ startTime, endTime }) => {
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
  const currentTime = dayjs().hour();

  return (
    <div
      className="p-4 overflow-x-auto border rounded-xl"
      onClick={() => onClick(bayId)}
    >
      <div className="font-semibold">베이 {bayNo}</div>
      <div className="flex justify-center">
        {currentTime > closingHour ? (
          <div>
            오늘 영업이 종료되었습니다 베이를 클릭하여 다음날 예약을 진행해
            보세요
          </div>
        ) : (
          <TimeSlot
            startHour={currentHour}
            endHour={closingHour}
            isReservedCallback={timeIsReserved}
          />
        )}
      </div>
    </div>
  );
};

export default BayItem;
