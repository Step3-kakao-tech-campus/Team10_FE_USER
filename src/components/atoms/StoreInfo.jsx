// StoreInfo.js
import React from "react";
import Photo from "./Photo";
import TimeImage from "/StoreInfo/Time.svg";
import MapImage from "/StoreInfo/Map.svg";
import TelImage from "/StoreInfo/Tel.svg";

const StoreInfo = ({ weekhour, weekendhour, tel, address }) => {
  return (
    <div className="grid gap-2 bg-gray-100 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <Photo src={TimeImage} alt="영업시간" />
        <div className="text-xs">
          <div>{weekhour}</div>
          <div className="text-left">{weekendhour}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Photo src={TelImage} alt="전화번호" />
        <div className="text-xs">{tel}</div>
      </div>
      <div className="flex items-center gap-2">
        <Photo src={MapImage} alt="주소" />
        <div className="text-xs">{address}</div>
      </div>
    </div>
  );
};

export default StoreInfo;
