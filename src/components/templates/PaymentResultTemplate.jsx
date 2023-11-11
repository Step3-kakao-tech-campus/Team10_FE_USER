import { TextWithIcon } from "../atoms/TextWithIcon";
import MapWithPin from "../atoms/MapWithPin";
import { Button } from "../atoms/Button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetStore } from "../../store/action";
import { useNavigate, useLocation } from "react-router-dom";

import dayjs from "dayjs";

const iconsrc = {
  calendar: "/TextWithIcon/calendar.png",
  clock: "/TextWithIcon/clock.png",
  location: "/TextWithIcon/location.png",
  price: "/TextWithIcon/price.png",
};

const PaymentResultTemplate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { reservationData } = location.state || {};

  console.log(reservationData);

  useEffect(() => {
    dispatch(resetStore());
  }, [dispatch]);

  const {
    reservation: {
      reservationId: reservationid,
      time: { start, end },
      price: price,
      bayNo: bayno,
    },
    carwash: {
      name: carwashname,
      location: { latitude, longitude },
    },
    imageList,
  } = reservationData;
  console.log(latitude);

  const formatTime = (dateTime) => {
    return dayjs(dateTime).format("HH시 mm분");
  };

  const formatDate = (dateTime) => {
    return dayjs(dateTime).format("YYYY년 MM월 DD일");
  };

  return (
    <div>
      <div className="relative p-4">
        <div className="py-8 text-2xl font-bold text-center">
          결제가 완료되었습니다
        </div>
        <div className="py-4 overflow-hidden rounded-lg bg-gray-50">
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
