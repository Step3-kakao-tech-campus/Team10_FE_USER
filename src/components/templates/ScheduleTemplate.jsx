import { BiSolidTimeFive } from "react-icons/bi";
import DatePicker from "../molecules/DatePicker";
import TimePicker from "../molecules/TimePicker";
import DurationPicker from "../molecules/DurationPicker";

const ScheduleTemplate = (
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
            <div className='flex flex-items gap-2 ml-4 mt-4 text-gray-500'>
                <BiSolidTimeFive className='mt-1' />
                <div>
                    <div>{weekhour}</div>
                    <div className='text-left'>{weekendhour}</div>
                </div>
            </div>
            {/*날짜 선택 */}
            <div>
                <DatePicker />
            </div>
            {/*시작 시간 선택*/}
            <div className="mt-8 mx-2">
                <div className="font-bold ml-2 my-2">시작 시간</div>
                <TimePicker />
            </div>
            {/*이용 시간 선택*/}
            <div>
                <DurationPicker />
            </div>
            {/*예약 일정 출력*/}
            <div className="ml-2"> 예약 일정 </div>

        </div>

    )

}

export default ScheduleTemplate;