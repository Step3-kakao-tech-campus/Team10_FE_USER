import { StarPicker } from "../atoms/StarPicker";
import { BadgeSet } from "../molecules/BadgeSet";
import { Button } from "../atoms/Button";

const ReviewPostTemplate = () => {
  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-2xl mx-4 mt-20 font-bold">
        예약한 세차장이 어땠나요?
      </h1>
      <StarPicker />
      <BadgeSet />
      <div className="flex justify-center items-center">
        <textarea
          className="w-96 h-64 mt-4 rounded-lg justify-center items-center bg-slate-100"
          placeholder="후기를 입력해주세요"
        />
      </div>

      <Button label="후기등록" className="mt-10" />
    </div>
  );
};

export default ReviewPostTemplate;
