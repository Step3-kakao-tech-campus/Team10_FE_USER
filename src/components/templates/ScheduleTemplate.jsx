import React, { useEffect, useState } from "react";
import TimeImage from "/StoreInfo/Time.svg";
import Image from "../atoms/Image";
import DatePicker from "../molecules/DatePicker";
import TimePicker from "../molecules/TimePicker";
import DurationPicker from "../molecules/DurationPicker";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation, useSuspenseQueries } from "@tanstack/react-query";
import { saveReservation } from "../../store/action";
import {
  carwashesInfo,
  carwashesBays,
  bookCarwash,
} from "../../apis/carwashes";

const ScheduleTemplate = ({ carwashId, bayId }) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [duration, setDuration] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [washinfo, bayinfo] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["washinfo"],
        queryFn: () => carwashesInfo(carwashId),
      },
      {
        queryKey: ["bayinfo"],
        queryFn: () => carwashesBays(carwashId),
      },
    ],
  });

  const mutation = useMutation({
    mutationFn: ({ carwashId, bayId, startTime, endTime }) => {
      return bookCarwash(carwashId, bayId, startTime, endTime);
    },
    onSuccess: () => {
      console.log("success");
      navigate("/payment");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = () => {
    const payload = {
      carwashId,
      bayId,
      formattedStartTime,
      formattedEndTime,
    };
    dispatch(saveReservation(formattedStartTime, formattedEndTime));
    mutation.mutate(payload);
  };

  if (washinfo == undefined) {
    return <div>Loading...</div>;
  }
  const name = washinfo?.data?.data?.response?.name;
  const openingHours = washinfo?.data?.data?.response?.optime;

  const bayInfo = bayinfo?.data?.data?.response.bayList.find(
    (bay) => bay.bayId === parseInt(bayId)
  );

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

    let endHour = Math.floor(endTimeInMinutes / 60);
    const endMinute = endTimeInMinutes % 60;

    let endDate = new Date(date);
    if (endHour >= 24) {
      endHour -= 24;
      endDate.setDate(endDate.getDate() + 1);
    }

    return {
      time: `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(
        2,
        "0"
      )}`,
      date: endDate,
    };
  };

  const computedEnd = computeEndTime();

  const combineDateTime = (date, time) => {
    return `${date.toISOString().split("T")[0]}T${time}`;
  };

  const formattedStartTime = combineDateTime(date, startTime);
  const formattedEndTime = computedEnd
    ? combineDateTime(computedEnd.date, computedEnd.time)
    : null;

  return (
    <div className="relative p-4">
      <div className="flex-grow pb-12 overflow-y-auto">
        <div className="mb-4 font-bold">{"<"}</div>
        <div className="mb-4 text-xl font-bold">
          {name}: 베이 {bayInfo.bayNo}
        </div>

        <div className="flex gap-2 mb-4">
          <Image src={TimeImage} alt="영업시간" className="py-1" />
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
          <div className="my-1 font-bold">시작 시간</div>
          <TimePicker
            bayId={bayInfo.bayId}
            openingHours={openingHours}
            handleButtonClick={handleStartTimeChange}
            bayBookedTime={bayInfo.bayBookedTime}
            duration={duration}
            selectedDate={date}
          />
        </div>
        <div className="my-4">
          <div className="mb-2 font-bold">사용 시간</div>
          <DurationPicker
            bayId={bayInfo.bayId}
            handleButtonClick={handleDurationChange}
            selectedDate={date}
            startTime={startTime}
            bayBookedTime={bayInfo.bayBookedTime}
            openingHours={openingHours}
          />
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="mb-2">예약 일정</div>
          <div className="mb-4">
            <div>
              시작 시간:&nbsp;
              {date &&
                `${date.getFullYear()}년 ${
                  date.getMonth() + 1
                }월 ${date.getDate()}일 ${startTime || ""} `}
            </div>
            <div>
              종료 시간:&nbsp;
              {computedEnd &&
                `${computedEnd.date.getFullYear()}년 ${
                  computedEnd.date.getMonth() + 1
                }월 ${computedEnd.date.getDate()}일 ${computedEnd.time}`}
            </div>
          </div>
        </div>
      </div>
      <button
        type="long"
        onClick={handleSubmit}
        className="fixed bottom-0 left-0 block w-full p-4 font-semibold text-white rounded-none h-14 bg-primary"
      >
        결제하러 가기
      </button>
    </div>
  );
};

export default ScheduleTemplate;
