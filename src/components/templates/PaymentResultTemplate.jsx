import { TextWithIcon } from "../atoms/TextWithIcon";
import { MapWithPin } from "../atoms/MapWithPin";
import { Button } from "../atoms/Button";
import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { reservations } from "../../apis/reservations";
import { useDispatch } from "react-redux";
import { resetStore } from "../../store/action";
import { useNavigate } from "react-router-dom";

const iconsrc = {
  calendar: "/TextWithIcon/calendar.png",
  clock: "/TextWithIcon/clock.png",
  location: "/TextWithIcon/location.png",
  price: "/TextWithIcon/price.png",
};

const PaymentResultTemplate = ({ reservationId }) => {
  const [paymentresult, setpaymentresult] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    // 페이지 로드 시 스토어를 초기 상태로 리셋
    dispatch(resetStore());

    if (data) {
      setpaymentresult(data?.data?.response);
      console.log(paymentresult);
    }
  }, [data, dispatch]);

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
    <div>
      <div className="relative p-4">
        <div className="py-8 text-2xl font-bold"> 결제가 완료되었습니다!</div>
        <div className="flex flex-col gap-4 py-4 rounded-lg bg-gray-50">
          <TextWithIcon text={extractDay(start)} iconsrc={iconsrc.calendar} />
          <TextWithIcon
            text={`${extractTime(start)}~${extractTime(end)}`}
            iconsrc={iconsrc.clock}
          />
          <TextWithIcon text={carwashname} iconsrc={iconsrc.location} />
          <TextWithIcon text={`${price}원`} iconsrc={iconsrc.price} />
          <MapWithPin lat={latitude} lng={longitude} text={carwashname} />
        </div>
      </div>
      <Button
        variant="long"
        className="fixed bottom-0"
        onClick={() => navigate("/")}
      >
        홈으로
      </Button>
    </div>
  );
};

export default PaymentResultTemplate;
