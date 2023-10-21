import React from "react";
import BayItem from "../molecules/BayItem";

const BayList = ({ bays, openingHours, selectedDate }) => {
  return (
    <div className="grid gap-2">
      {bays.map((item, index) => (
        <BayItem
          key={index}
          bayId={item.bayId}
          bayNo={item.bayNo}
          bayBookedTime={item.bayBookedTime}
          openingHours={openingHours}
          selectedDate={selectedDate}
        />
      ))}
    </div>
  );
};

export default BayList;
