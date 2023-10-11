import React from 'react';

const BayItem = ({ 
    bay_count = "7",
    selected_times = "09:00"
 }) => {

  return (
    <div className='bg-gray-100 rounded-lg mx-4 w-auto py-4'>
        <div className='ml-4'>베이 {bay_count}</div>
        <div className='ml-4'>
            예약된 시간 {selected_times}
        </div>
    </div>
  );
};

export default BayItem;
