import { TextWithIcon } from "../atoms/TextWithIcon";
import { MapWithPin } from "../atoms/MapWithPin";
import { Button } from "../atoms/Button";

const iconsrc = {
  calendar: "/TextWithIcon/calendar.png",
  clock: "TextWithIcon/clock.png",
  location: "TextWithIcon/location.png",
  price: "TextWithIcon/price.png",
};

const PaymentResultTemplate = () => {
  return (
    <div className="relative grid gap-8">
      <section className="grid gap-4">
        <div className="text-2xl font-bold ">결제가 완료되었습니다!</div>
        <div className="text-left text-sm">득광하세요!</div>
      </section>
      <section className="grid gap-4">
        <TextWithIcon text="2023/09/08" iconsrc={iconsrc.calendar} />
        <hr />
        <TextWithIcon text="13:00 ~ 15:00" iconsrc={iconsrc.clock} />
        <hr />
        <TextWithIcon text="용봉세차타운:베이 7" iconsrc={iconsrc.location} />
        <hr />
        <TextWithIcon text="20,000원" iconsrc={iconsrc.price} />
        <MapWithPin lat="35.17388" lng="126.9112" text="용봉세차타운" />
      </section>
      <Button className="fixed bottom-0" label="홈으로" />
    </div>
  );
};

export default PaymentResultTemplate;
