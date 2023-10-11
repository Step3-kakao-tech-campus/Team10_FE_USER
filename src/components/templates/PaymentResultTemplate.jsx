import { TextWithIcon } from "../atoms/TextWithIcon";
import { MapWithPin } from "../atoms/MapWithPin";
import { Button } from "../atoms/Button";

const iconsrc = {
  calendar: "TextWithIcon\\calendar.png",
  clock: "TextWithIcon\\clock.png",
  location: "TextWithIcon\\location.png",
  price: "TextWithIcon\\price.png",
};

const PaymentResultTemplate = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-start gap-3">
      <div className="mx-4 mt-20 text-2xl font-bold ">
        결제가 완료되었습니다!
      </div>
      <div className="mx-4 text-left text-sm">득광하세요!</div>
      <TextWithIcon
        className="mx-4 mt-4"
        text="2023/09/08"
        iconsrc={iconsrc.calendar}
      />

      <div className="mx-4 w-96 h-[0px] border border-neutral-200"></div>
      <TextWithIcon
        className="mx-4"
        text="13:00 ~ 15:00"
        iconsrc={iconsrc.clock}
      />
      <div className="mx-4 w-96 h-[0px] border border-neutral-200"></div>
      <TextWithIcon
        className="mx-4"
        text="용봉세차타운:베이 7"
        iconsrc={iconsrc.location}
      />
      <div className="mx-4 w-96 h-[0px] border border-neutral-200"></div>
      <TextWithIcon className="mx-4" text="20,000원" iconsrc={iconsrc.price} />
      <MapWithPin
        className="mx-4 mt-4"
        lat="35.17388"
        lng="126.9112"
        text="용봉세차타운"
      />
      <Button label="홈으로" />
    </div>
  );
};

export default PaymentResultTemplate;
