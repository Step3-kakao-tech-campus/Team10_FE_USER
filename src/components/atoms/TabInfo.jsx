import React from "react";

const TabInfo = ({ introduction }) => {
  return (
    <div>
        <div className="scrollable-text h-48 overflow-y-auto">
            { introduction }
        </div>
    </div>
  );
};

export default TabInfo;
