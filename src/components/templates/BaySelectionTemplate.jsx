import React from "react";
import TimeImage from "/StoreInfo/Time.svg";
import Photo from "../atoms/Photo";
import BayList from "../molecules/BayList";

const BaySelectionTemplate = ({
  name = "포세이돈워시 용봉점",
  openingHours = {
    weekday: { start: "00:00", end: "23:00" },
    weekend: { start: "00:00", end: "23:00" },
  },
  bayscheduledata = [
    {
      bay_count: 1,
      scheduledTimes: [
        { start: "10:00", end: "13:30" },
        { start: "14:00", end: "14:30" },
      ],
    },
    {
      bay_count: 2,
      scheduledTimes: [
        { start: "11:00", end: "12:30" },
        { start: "15:00", end: "16:00" },
      ],
    },
    {
      bay_count: 3,
      scheduledTimes: [
        { start: "11:00", end: "12:30" },
        { start: "15:00", end: "16:00" },
      ],
    },
  ],
}) => {
  return (
    <div className="relative p-4">
      <div className="mb-4 font-bold">{"<"}</div>
      <div className="mb-4 font-bold text-xl">{name}</div>
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
      <div>
        <BayList bays={bayscheduledata} openingHours={openingHours} />
      </div>
    </div>
  );
};

export default BaySelectionTemplate;
