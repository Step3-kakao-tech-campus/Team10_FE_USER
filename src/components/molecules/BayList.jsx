import React from "react";
import BayItem from "../atoms/BayItem"; // Adjust the import path as needed

const BayList = ({ bays, openingHours }) => {
  return (
    <div className="grid gap-2">
      {bays.map((item, index) => (
        <BayItem
          key={index}
          bay_count={item.bay_count}
          scheduledTimes={item.scheduledTimes}
          openingHours={openingHours}
        />
      ))}
    </div>
  );
};

export default BayList;
