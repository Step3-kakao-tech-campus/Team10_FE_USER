import React, { useState } from "react";
import TimeImage from "/StoreInfo/Time.svg";
import Photo from "../atoms/Photo";
import DatePicker from "../molecules/DatePicker";
import TimePicker from "../molecules/TimePicker";
import DurationPicker from "../molecules/DurationPicker";
import { Button } from "../atoms/Button";

const ScheduleTemplate = ({}) => {
  const name = "포세이돈워시 용봉점";
  const openingHours = {
    weekday: { start: "00:00", end: "24:00" },
    weekend: { start: "00:00", end: "24:00" },
  };

  // 세차장별 예약 내역 조회 '/carwashes/{carwash_id}/bays'
  const bayList = [
    {
      bayId: 2,
      bayNo: 1,
      bayBookedTime: [
        {
          startTime: "2023-10-15T18:30",
          endTime: "2023-10-15T20:30:",
        },
        {
          startTime: "2023-10-15T22:00",
          endTime: "2023-10-15T23:00",
        },
      ],
    },
    {
      bayId: 3,
      bayNo: 2,
      bayBookedTime: [
        {
          startTime: "2023-10-15T18:00",
          endTime: "2023-10-15T20:00:",
        },

        {
          startTime: "2023-10-15T20:00",
          endTime: "2023-10-15T22:00",
        },
      ],
    },
  ];
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [duration, setDuration] = useState();
  const handleDateChange = (date) => {
    setDate(date);
    setStartTime(null);
    setDuration(null);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    setDuration(null);
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

  const combineDateTime = (date, time) => {
    return `${date.toISOString().split("T")[0]}T${time}`;
  };

  const formattedStartTime = combineDateTime(date, startTime);
  const formattedEndTime = combineDateTime(date, computedEndTime);

  return (
    <div className="relative p-4">
      <div className="flex-grow overflow-y-auto pb-12">
        <div className="mb-4 font-bold">{"<"}</div>
        <div className="mb-4 font-bold text-xl">
          {name}: 베이 {bayList.bayNo}
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
            bayId={bayList.bayId}
            openingHours={openingHours}
            handleButtonClick={handleStartTimeChange}
            scheduledTimes={bayList.bayBookedTime}
            duration={duration}
            selectedDate={date}
          />
        </div>
        <div className="my-4">
          <div className="font-bold mb-2">사용 시간</div>
          <DurationPicker
            bayId={bayList.bayId}
            handleButtonClick={handleDurationChange}
            selectedDate={date}
            startTime={startTime}
            scheduledTimes={bayList.bayBookedTime}
            openingHours={openingHours}
          />
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
      <button
        type="long"
        onClick={() => {
          console.log("Start Time:", formattedStartTime);
          console.log("End Time:", formattedEndTime);
        }}
        className="fixed left-0 bottom-0 block w-full h-14 p-4 bg-primary text-white font-semibold rounded-none"
      >
        예약하기
      </button>
    </div>
  );
};

export default ScheduleTemplate;
