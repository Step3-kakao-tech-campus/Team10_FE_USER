import React from "react";
import BayItem from "../molecules/BayItem";

const BayList = ({ bays, openingHours, selectedDate, onClick }) => {
  console.log(bays);
  return (
    <div className="grid gap-4">
      {bays.map((item) => (
        <BayItem
          key={item.bayId}
          bayId={item.bayId}
          bayNo={item.bayNo}
<<<<<<< HEAD
          bayBookedTime={item.bayBookedTimeList}
=======
          bayBookedTimeList={item.bayBookedTimeList}
>>>>>>> 32327f75ebb60d4aea7dde43d9eaadcdd5e1b04c
          openingHours={openingHours}
          selectedDate={selectedDate}
          onClick={() => onClick(item.bayId)}
        />
      ))}
    </div>
  );
};

export default BayList;
