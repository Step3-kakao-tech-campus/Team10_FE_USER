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
  const timeIsReserved = (hour, bayBookedTimeList, selectedDate) => {
    const startTimeToCheck = dayjs(selectedDate).hour(hour).minute(0);
    const halfPastTimeToCheck = dayjs(selectedDate).hour(hour).minute(30);

    return bayBookedTimeList.some((timeSlot) => {
      const startTime = dayjs(timeSlot.startTime);
      const endTime = dayjs(timeSlot.endTime);

      return (
        startTimeToCheck.isSame(startTime) ||
        (startTimeToCheck.isBefore(endTime) &&
          startTimeToCheck.isAfter(startTime)) ||
        halfPastTimeToCheck.isSame(startTime) ||
        (halfPastTimeToCheck.isBefore(endTime) &&
          halfPastTimeToCheck.isAfter(startTime))
      );
    });
  };

  const isWeekend =
    dayjs(selectedDate).day() === 0 || dayjs(selectedDate).day() === 6;
  const openingHoursForToday = isWeekend
    ? openingHours.weekend
    : openingHours.weekday;

  const now = dayjs();
  const closingTimeToday = dayjs()
    .set("hour", parseInt(openingHoursForToday.end.split(":")[0]))
    .set("minute", parseInt(openingHoursForToday.end.split(":")[1]));

  const isBusinessClosed = now.isAfter(closingTimeToday);

  const renderSlotsOrClosedMessage = () => {
    if (isBusinessClosed) {
      return (
        <div className="my-2 font-semibold text-center">
          오늘 영업이 종료되었습니다.
          <div>다음날 예약을 진행해 보세요.</div>
        </div>
      );
    } else {
      return (
        <TimeSlot
          startHour={now.hour()}
          endHour={closingTimeToday.hour()}
          isReservedCallback={(hour) =>
            timeIsReserved(hour, bayBookedTimeList, selectedDate)
          }
        />
      );
    }
  };

  return (
    <div
      className="p-4 overflow-x-auto border rounded-xl"
      onClick={() => onClick(bayId)}
    >
      <div className="font-semibold">베이 {bayNo}</div>
      {renderSlotsOrClosedMessage()}
    </div>
  );
};

export default BayItem;
