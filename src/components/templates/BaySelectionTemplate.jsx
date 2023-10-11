import { BiSolidTimeFive } from "react-icons/bi";
import BayItem from "../atoms/BayItem";

const BaySelectionTemplate = (
    {
        name = "포세이돈워시 용봉점",
        bay_count = "7",
        weekhour = '평일 오전 7:00 ~ 오후 11:00',
        weekendhour = '주말 24시간 영업'
    }
) => {
    return (
        <div>
            {/*뒤로가기 버튼 상단바 */}
            <div className="font-bold mt-2 ml-4 ">뒤로가기</div>
            {/*매장명 + 베이 번호 */}
            <div className="flex flex-items mt-4 ml-4">
                <div className="font-bold text-xl">{name}: 베이 {bay_count}</div>
            </div>
            {/*영업시간*/}
            <div className='flex flex-items gap-2 ml-4 my-4 text-gray-500'>
                <BiSolidTimeFive className='mt-1' />
                <div>
                    <div>{weekhour}</div>
                    <div className='text-left'>{weekendhour}</div>
                </div>
            </div>
            {/*베이 현황*/}
              <BayItem />
        </div>

    )

}

export default BaySelectionTemplate;