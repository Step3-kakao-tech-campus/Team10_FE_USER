import React from "react";
import TimeImage from "/StoreInfo/Time.svg";
import Photo from "../atoms/Photo";
import BayList from "../molecules/BayList";

const BaySelectionTemplate = ({}) => {
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
        <BayList
          bays={bayList}
          openingHours={openingHours}
          selectedDate={new Date()}
        />
      </div>
    </div>
  );
};

export default BaySelectionTemplate;
