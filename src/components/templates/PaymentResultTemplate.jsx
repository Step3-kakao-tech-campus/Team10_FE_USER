import { TextWithIcon } from "../atoms/TextWithIcon";
import { MapWithPin } from "../atoms/MapWithPin";
import { Button } from "../atoms/Button";
import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { reservations } from "../../apis/reservations";
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
  const [paymentresult, setpaymentresult] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { reservationData } = location.state || {};
  // const reservationData = {
  //   reservation: {
  //     reservationId: 1,
  //     time: {
  //       start: "2023-11-01T12:00:00",
  //       end: "2023-11-01T13:00:00",
  //     },
  //     price: 6000,
  //     bayNo: 1,
  //   },
  //   carwash: {
  //     name: "구름 세차장",
  //     location: {
  //       latitude: 35.1502,
  //       longitude: 126.9167,
  //     },
  //     carwashImages: [
  //       {
  //         id: 1,
  //         name: "image1.jpg",
  //         url: "http://example.com/image1.jpg",
  //         path: "/images/image1.jpg",
  //         uploadedAt: "2023-10-24T10:00:00",
  //       },
  //     ],
  //   },
  // };
  console.log(reservationData);

  useEffect(() => {
    dispatch(resetStore());
  }, [dispatch]);

  if (!reservationData) {
    return <div>Loading...</div>;
  }

  const {
    reservation: {
      time: { start, end },
      price,
      reservationId,
      bayNo,
    },
    carwash: {
      name: carwashname,
      location: { latitude, longitude },
    },
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
