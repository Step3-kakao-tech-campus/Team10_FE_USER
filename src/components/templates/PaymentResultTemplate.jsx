import { TextWithIcon } from "../atoms/TextWithIcon";
import { MapWithPin } from "../atoms/MapWithPin";
import { Button } from "../atoms/Button";
import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { reservations } from "../../apis/reservations";

const iconsrc = {
  calendar: "/TextWithIcon/calendar.png",
  clock: "TextWithIcon/clock.png",
  location: "TextWithIcon/location.png",
  price: "TextWithIcon/price.png",
};

const PaymentResultTemplate = ({ reservationId }) => {
  const [paymentresult, setpaymentresult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data } = useSuspenseQuery({
    // 나중에 reservation api에 reservationId 추가 되면 이거로 코드 바꾸기
    // queryKey: ["getReservations", reservationId],
    // queryFn: () => reservations(reservationId),
    queryKey: ["getReservations"],
    queryFn: () => reservations(),
  });

  useEffect(() => {
    if (data) {
      setpaymentresult(data?.data?.response);
      console.log(paymentresult);
    }
  }, [data]);

  if (!paymentresult) {
    return <div>Loading...</div>;
  }

  const {
    reservation: {
      time: { start, end },
      price,
    },
    carwash: {
      name: carwashname,
      location: { latitude, longitude },
    },
  } = paymentresult;

  const extractTime = (dateTime) => {
    const date = new Date(dateTime);
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    );
  };

  const extractDay = (dateTime) => {
    const date = new Date(dateTime);
    return (
      date.getMonth().toString().padStart(2, "0") +
      "월 " +
      date.getDay().toString().padStart(2, "0") +
      "일"
    );
  };

  return (
    <div className="relative grid gap-8">
      <section className="grid gap-4">
        <div className="text-2xl font-bold ">결제가 완료되었습니다!</div>
        <div className="text-sm text-left">득광하세요!</div>
      </section>
      <section className="grid gap-4">
        <TextWithIcon text={extractDay(start)} iconsrc={iconsrc.calendar} />
        <hr />
        <TextWithIcon
          text={`${extractTime(start)}~${extractTime(end)}`}
          iconsrc={iconsrc.clock}
        />
        <hr />
        <TextWithIcon text={carwashname} iconsrc={iconsrc.location} />
        <hr />
        <TextWithIcon text={`${price}원`} iconsrc={iconsrc.price} />
        <MapWithPin lat={latitude} lng={longitude} text={carwashname} />
      </section>
      <Button className="fixed bottom-0" label="홈으로" />
    </div>
  );
};

export default PaymentResultTemplate;
