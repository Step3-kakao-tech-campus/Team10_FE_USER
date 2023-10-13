import React, { useState } from "react";
import TimeImage from "/StoreInfo/Time.svg";
import Photo from "../atoms/Photo";
import DatePicker from "../molecules/DatePicker";
import TimePicker from "../molecules/TimePicker";
import DurationPicker from "../molecules/DurationPicker";
import { Button } from "../atoms/Button";

const ScheduleTemplate = ({
  name = "포세이돈워시 용봉점",
  bay_count = "7",
  openingHours = {
    weekday: { start: "09:00", end: "18:00" },
    weekend: { start: "09:00", end: "18:00" },
  },
  scheduledTimes = [
    { start: "10:30", end: "11:30" },
    { start: "14:00", end: "14:30" },
    { start: "15:30", end: "16:00" },
  ],
}) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [duration, setDuration] = useState();
  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleDurationChange = (duration) => {
    setDuration(duration);
  };

  const computeEndTime = () => {
    if (!startTime || !duration) return;

    const [hours, minutes] = startTime.split(":").map(Number);
    const endTimeInMinutes = hours * 60 + minutes + duration;
    const endHour = Math.floor(endTimeInMinutes / 60);
    const endMinute = endTimeInMinutes % 60;

    return `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(
      2,
      "0"
    )}`;
  };
  const computedEndTime = computeEndTime();

  return (
    <div className="relative p-4">
      <div className="flex-grow overflow-y-auto pb-12">
        <div className="mb-4 font-bold">{"<"}</div>
        <div className="mb-4 font-bold text-xl">
          {name}: 베이 {bay_count}
        </div>

        <div className="flex gap-2 mb-4">
          <Photo src={TimeImage} alt="영업시간" />
          <div>
            <div>
              평일 {openingHours.weekday.start} ~ {openingHours.weekday.end}
            </div>
            <div>
              주말 {openingHours.weekend.start} ~ {openingHours.weekend.end}
            </div>
          </div>
        </div>

        <DatePicker handleButtonClick={handleDateChange} />

        <div className="my-4">
          <div className="font-bold my-1">시작 시간</div>
          <TimePicker
            openingHours={openingHours}
            handleButtonClick={handleStartTimeChange}
            scheduledTimes={scheduledTimes}
            duration={duration}
          />
        </div>
        <div className="my-4">
          <div className="font-bold mb-2">사용 시간</div>
          <DurationPicker handleButtonClick={handleDurationChange} />
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="mb-2">예약 일정</div>
          <div className="mb-4">
            {date &&
              `${date?.getFullYear()}년 ${
                date?.getMonth() + 1
              }월 ${date?.getDate()}일 ${startTime ? startTime : ""} ${
                computedEndTime ? `~ ${computedEndTime}` : ""
              }`}
          </div>
        </div>
      </div>
      <Button type="long" label="예약하기" className="fixed left-0 bottom-0" />
    </div>
  );
};

export default ScheduleTemplate;
