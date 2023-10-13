import React from "react";
import BayItem from "../atoms/BayItem"; // Adjust the import path as needed

const BayList = ({ bays }) => {
  return (
    <div className="grid gap-2">
      {bays.map((bay, index) => (
        <BayItem
          key={index}
          bay_count={bay.bay_count}
          scheduledTimes={bay.scheduledTimes}
        />
      ))}
    </div>
  );
};

export default BayList;
