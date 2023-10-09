// StoreInfo.js
import React from 'react';
import { BiSolidTimeFive, BiSolidMap} from 'react-icons/bi';
import { BsFillTelephoneFill } from'react-icons/bs';

const StoreInfo = ({ weekhour, weekendhour, tel, address }) => {
  return (
    <div className='w-auto h-auto justify-center bg-gray-100 rounded-lg'>
      <div className='flex flex-col mt-1 gap-2'>
        <div className='flex flex-items gap-2 ml-4 mt-2'>
          <BiSolidTimeFive className='mt-1' />
          <div>
            <div>{weekhour}</div>
            <div className='text-left'>{weekendhour}</div>
          </div>
        </div>
        <div className='flex flex-items gap-2 ml-4 mt-2'>
          <BsFillTelephoneFill />
          <div>{tel}</div>
        </div>
        <div className='flex flex-items gap-2 ml-4 mt-2'>
          <BiSolidMap className='mt-1'/>
          <div>{address}</div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;