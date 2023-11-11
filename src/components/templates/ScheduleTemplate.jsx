import React, { useState } from "react";
import TimeImage from "/StoreInfo/Time.svg";
import Image from "../atoms/Image";
import CustomModal from "../atoms/CustomModal";
import DatePicker from "../molecules/DatePicker";
import TimePicker from "../molecules/TimePicker";
import DurationPicker from "../molecules/DurationPicker";
import { useNavigate } from "react-router-dom";
import { Button } from "../atoms/Button";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { saveReservation } from "../../store/action";
import { carwashesInfo, carwashesBays } from "../../apis/carwashes";

const ScheduleTemplate = ({ carwashId, bayId }) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [duration, setDuration] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [washinfo, bayinfo] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["washinfo", carwashId],
        queryFn: () => carwashesInfo(carwashId),
      },
      {
        queryKey: ["bayinfo", carwashId],
        queryFn: () => carwashesBays(carwashId),
      },
    ],
  });

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    if (!startTime || !duration) {
      setIsModalOpen(true);
      return;
    }

    dispatch(saveReservation(formattedStartTime, formattedEndTime));
    navigate("/payment");
  };

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
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = [
      year,
      month.toString().padStart(2, "0"),
      day.toString().padStart(2, "0"),
    ].join("-");

    return `${formattedDate}T${time}`;
  };

  const formattedStartTime = startTime
    ? combineDateTime(date, startTime)
    : null;
  const formattedEndTime = computedEnd
    ? combineDateTime(computedEnd.date, computedEnd.time)
    : null;

  const modalContent = (
    <div className="flex flex-col gap-2">
      <div>시작시간과 사용시간을 모두 선택해주세요</div>
    </div>
  );

  return (
    <div>
      <div className="p-4 grid-4">
        <div className="text-xl font-bold">
          {name}: 베이 {bayInfo.bayNo}
        </div>

        <div className="flex items-center gap-2">
          <Image src={TimeImage} alt="영업시간" />
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

        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="text-lg font-bold">시작 시간</div>
            <TimePicker
              bayId={bayInfo.bayId}
              openingHours={openingHours}
              handleButtonClick={handleStartTimeChange}
              bayBookedTimeList={bayInfo.bayBookedTimeList}
              duration={duration}
              selectedDate={date}
            />
          </div>
          <div className="grid gap-2">
            <div className="text-lg font-bold">사용 시간</div>
            <DurationPicker
              bayId={bayInfo.bayId}
              handleButtonClick={handleDurationChange}
              selectedDate={date}
              startTime={startTime}
              bayBookedTimeList={bayInfo.bayBookedTimeList}
              openingHours={openingHours}
            />
          </div>
        </div>
        <div className="grid gap-2 p-4 border-2 rounded-lg bg-gray-50 border-primary">
          <div className="text-lg font-semibold">예약 일정</div>
          <div>
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
      <Button onClick={handleSubmit} variant="long" className="fixed bottom-0">
        예약하기
      </Button>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="선택 오류"
        content={modalContent}
        confirmText="확인"
      />
    </div>
  );
};

export default ScheduleTemplate;
