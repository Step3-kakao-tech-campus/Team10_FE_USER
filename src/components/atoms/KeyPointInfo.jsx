import React from 'react';
// 키포인트 받아와서 개수가 다를 때 배치 구상 필요 
const KeyPointInfo = () => {
    return (
        <div className='w-96 py-2 bg-gray-100 rounded-lg'>
            <div className='font-bold text-left ml-4 mt-2'>키포인트</div>
            <div className='flex flex-col gap-2 ml-4 mt-2'>
                <div className='flex flex-items gap-4 '>
                    <div>하부세차</div>
                     <div className='ml-20'>100% 수돗물</div>
                </div>
                <div className='flex flex-items gap-6'>
                     <div>개러지형 독립공간</div>
                <div>야간 조명</div>
                </div>
               
            </div>
        </div>
    );
};

export default KeyPointInfo;
