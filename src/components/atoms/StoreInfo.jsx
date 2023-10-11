// StoreInfo.js
import React from 'react';
import { BiSolidTimeFive, BiSolidMap} from 'react-icons/bi';
import { BsFillTelephoneFill } from'react-icons/bs';
import Photo from './Photo';
import TimeImage from "/StoreInfo/Time.svg";
import MapImage from "/StoreInfo/Map.svg";
import TelImage from "/StoreInfo/Tel.svg";

const StoreInfo = ({ weekhour, weekendhour, tel, address }) => {
  return (
    <div className='w-auto h-auto justify-center bg-gray-100 rounded-lg'>
      <div className='flex flex-col my-2 gap-1'>
        <div className='flex flex-items gap-2 ml-4 mt-2'>
          <Photo src={TimeImage} alt="영업시간" className='mt-1' />
          <div>
            <div>{weekhour}</div>
            <div className='text-left'>{weekendhour}</div>
          </div>
        </div>
        <div className='flex flex-items gap-2 ml-4 mt-2'>
          <Photo src={TelImage} alt="전화번호" className='mt-0.5' />
          <div>{tel}</div>
        </div>
        <div className='flex flex-items gap-2 ml-4 mt-2'>
          <Photo src={MapImage} alt="주소" className='mt-0.5' />
          <div>{address}</div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;