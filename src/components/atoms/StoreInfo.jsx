import React from "react";
import Image from "./Image";
import TimeImage from "/StoreInfo/Time.svg";
import MapImage from "/StoreInfo/Map.svg";
import TelImage from "/StoreInfo/Tel.svg";

const StoreInfo = ({ weekhour, weekendhour, tel, address }) => {
  return (
    <div className="grid gap-2 p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center gap-2">
        <Image src={TimeImage} alt="영업시간" />
        <div className="text-xs">
          <div>{weekhour}</div>
          <div className="text-left">{weekendhour}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Image src={TelImage} alt="전화번호" />
        <a href={`tel:${tel}`} className="text-xs text-primary">
          {tel}
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Image src={MapImage} alt="주소" />
        <div className="text-xs">{address}</div>
      </div>
    </div>
  );
};

export default StoreInfo;
