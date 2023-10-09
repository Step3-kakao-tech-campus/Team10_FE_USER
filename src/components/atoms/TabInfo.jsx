import React from "react";

const TabInfo = ({ introduction }) => {
  return (
    <div>
        <div className="overflow-y-auto my-4 text-left mx-2">
            { introduction }
        </div>
    </div>
  );
};

export default TabInfo;