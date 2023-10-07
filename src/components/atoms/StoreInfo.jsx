import React from 'react';
import { BiSolidTimeFive, BiSolidMap} from 'react-icons/bi';
import { BsFillTelephoneFill } from'react-icons/bs';

const StoreInfo = () => {
    return (
        <div className='w-[361px] h-[116px] bg-gray-100 rounded-lg'>
            <div className='flex flex-col mt-1 gap-2'>
            <div className='flex flex-items gap-2 ml-4 mt-25'>
            <BiSolidTimeFive className='mt-1' />
                <div>
                    <div>평일 오전 7:00 ~ 오후 11:00</div>
                    <div className='text-left'>주말 24시간 영업</div>
                </div>
            </div>
            <div className='flex flex-items gap-2 ml-4 mt-25'>
                <BsFillTelephoneFill />
                <div> 062-000-0000</div>
            </div>
            <div className='flex flex-items gap-2 ml-4 mt-25'>
                <BiSolidMap className='mt-1'/>
                <div>광주 북구 설죽로 266</div>
            </div>
            </div>
        </div>
    );
};

export default StoreInfo;
