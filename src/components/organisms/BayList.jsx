// BayList.js
import React from "react";
import BayItem from "../molecules/BayItem";

const BayList = ({ bays, openingHours, selectedDate, onClick }) => {
  return (
    <div className="grid gap-2">
      {bays.map((item) => (
        <BayItem
          key={item.bayId}
          bayId={item.bayId}
          bayNo={item.bayNo}
          bayBookedTime={item.bayBookedTime}
          openingHours={openingHours}
          selectedDate={selectedDate}
          onClick={() => onClick(item.bayId)} // Pass bayId to onClick
        />
      ))}
    </div>
  );
};

export default BayList;
