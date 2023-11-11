import React from "react";
import Image from "./Image";
import TimeImage from "/StoreInfo/Time.svg";
import MapImage from "/StoreInfo/Map.svg";
import TelImage from "/StoreInfo/Tel.svg";

const StoreInfo = ({ weekhour, weekendhour, tel, address }) => {
  const formatPhoneNumber = (phoneNumber) => {
    const digits = phoneNumber.replace(/\D/g, "");

    if (digits.length === 11) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(
        7,
        11
      )}`;
    } else if (digits.length === 10) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    } else {
      return phoneNumber;
    }
  };

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
          {formatPhoneNumber(tel)}
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
