import TimeImage from "/StoreInfo/Time.svg";
import Photo from "../atoms/Photo";
import DatePicker from "../molecules/DatePicker";
import TimePicker from "../molecules/TimePicker";
import DurationPicker from "../molecules/DurationPicker";
import { Button } from "../atoms/Button";
import { useState } from "react";

const ScheduleTemplate = ({
  name = "포세이돈워시 용봉점",
  bay_count = "7",
  openingHours = {
    weekdayStartTime: new Date(),
    weekdayEndTime: new Date(),
    weekendStartTime: new Date(),
    weekendEndTime: new Date(),
  },
}) => {
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  openingHours.weekdayStartTime.setHours(9);
  openingHours.weekdayStartTime.setMinutes(0);
  openingHours.weekdayEndTime.setHours(18);
  openingHours.weekdayEndTime.setMinutes(0);
  openingHours.weekendStartTime.setHours(9);
  openingHours.weekendStartTime.setMinutes(0);
  openingHours.weekendEndTime.setHours(18);
  openingHours.weekendEndTime.setMinutes(0);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  return (
    <div className="relative">
      {/*뒤로가기 버튼 상단바 */}
      <div className="font-bold">{"<"}</div>

      {/*매장명 + 베이 번호 */}
      <div className="font-bold text-xl">
        {name}: 베이 {bay_count}
      </div>

      {/*영업시간*/}
      <div className="flex gap-2">
        <Photo src={TimeImage} alt="영업시간" />
        <div>
          <div>
            평일 {openingHours.weekdayStartTime.getHours() + ":00"} ~{" "}
            {openingHours.weekdayEndTime.getHours() + ":00"}
          </div>
          <div>
            주말 {openingHours.weekendStartTime.getHours() + ":00"} ~{" "}
            {openingHours.weekendEndTime.getHours() + ":00"}
          </div>
        </div>
      </div>

      {/*날짜 선택 */}
      <DatePicker handleButtonClick={handleDateChange} />

      {/*시작 시간 선택*/}
      <div>
        <div className="font-bold">시작 시간</div>
        <TimePicker
          openingHours={openingHours}
          handleButtonClick={handleStartTimeChange}
        />
      </div>

      {/*이용 시간 선택*/}
      <div>
        <DurationPicker handleButtonClick={handleEndTimeChange} />
      </div>

      {/*예약 일정 출력*/}
      <div>예약 일정</div>
      <div>
        {date?.getFullYear() +
          "년 " +
          (date?.getMonth() + 1) +
          "월 " +
          date?.getDate() +
          "일 " +
          startTime +
          "시부터 " +
          endTime +
          "분동안"}
      </div>

      {/*예약 일정 출력*/}
      <Button label="예약하기" className="fixed bottom-0" />
    </div>
  );
};

export default ScheduleTemplate;
