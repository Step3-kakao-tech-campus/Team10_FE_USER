import { TextWithIcon } from "../atoms/TextWithIcon";
import { MapWithPin } from "../atoms/MapWithPin";
import { Button } from "../atoms/Button";
import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { reservations } from "../../apis/reservations";
import { useDispatch } from "react-redux";
import { resetStore } from "../../store/action";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

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

  const formatTime = (dateTime) => {
    return dayjs(dateTime).format("HH시 mm분");
  };

  const formatDate = (dateTime) => {
    return dayjs(dateTime).format("YYYY년 MM월 DD일");
  };

  return (
    <div>
      <div className="relative p-4">
        <div className="py-8 text-2xl font-bold"> 결제가 완료되었습니다!</div>
        <div className="py-4 bg-gray-100 rounded-lg ">
          <div className="flex flex-col gap-4 p-4">
            <TextWithIcon text={formatDate(start)} iconsrc={iconsrc.calendar} />
            <TextWithIcon
              text={`${formatTime(start)} - ${formatTime(end)}`}
              iconsrc={iconsrc.clock}
            />
            <TextWithIcon text={carwashname} iconsrc={iconsrc.location} />
            <TextWithIcon text={`${price}원`} iconsrc={iconsrc.price} />
            <MapWithPin lat={latitude} lng={longitude} text={carwashname} />
          </div>
        </div>
      </div>
      <Button
        variant="long"
        className="fixed bottom-0 left-0"
        onClick={() => navigate("/")}
      >
        홈으로
      </Button>
    </div>
  );
};

export default PaymentResultTemplate;
