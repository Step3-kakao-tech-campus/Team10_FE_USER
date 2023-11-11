import ReservationItem from "../molecules/ReservationItem";
import { useSuspenseQuery } from "@tanstack/react-query";
import { reservationsCurrentstatus } from "../../apis/reservations";
import dayjs from "dayjs";
import { Button } from "../atoms/Button";

const ReservationHistoryTemplate = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["getHistory"],
    queryFn: reservationsCurrentstatus,
  });

  const currentReservations = data.data.response.currentReservationList;
  const upcomingReservations = data.data.response.upcomingReservationList;
  const completedReservations = data.data.response.completeReservationList;

  const formatTimestamp = (timestamp) => {
    return {
      date: dayjs(timestamp).format("YYYY/MM/DD"),
      time: dayjs(timestamp).format("HH시 mm분"),
    };
  };

  const formatTime = (timestamp) => {
    return dayjs(timestamp).format("HH시 mm분");
  };

  return (
    <div className="grid gap-4">
      <div className="pt-16 text-2xl font-bold">예약내역</div>

      <div className="text-lg font-semibold">현재 진행중인 세차</div>
      {currentReservations.map((reservation) => (
        <ReservationItem
          key={reservation.id}
          rsvid={reservation.id}
          carwashid={reservation.carwashId}
          imgsrc={
            reservation.image
              ? reservation.image.url
              : "/CarashDetail/imagenotfound.png"
          }
          reservedTime={reservation.time}
          bayname={`${reservation.carwashName}: 베이${reservation.bayNum}`}
          priceinfo={reservation.price}
        />
      ))}
      <hr />
      <div className="text-lg font-semibold">예정된 세차</div>
      {upcomingReservations.length ? (
        upcomingReservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            carwashid={reservation.carwashId}
            rsvid={reservation.id}
            imgsrc={
              reservation.image
                ? reservation.image.url
                : "/CarashDetail/imagenotfound.png"
            }
            reservedTime={reservation.time}
            bayname={`${reservation.carwashName}: 베이${reservation.bayNum}`}
            priceinfo={reservation.price}
            buttontype="cancel"
          />
        ))
      ) : (
        <div>
          <div>예정된 세차가 없습니다. 세차장 예약을 시작해보세요!</div>
          <Button
            variant="long"
            className="bg-yellow-400 rounded-md"
            onClick={() => navigate("/reservation")}>
            예약하러 가기
          </Button>
        </div>
      )}

      <hr />
      <div className="text-lg font-semibold">완료한 세차</div>
      {completedReservations.map((reservation) => (
        <ReservationItem
          key={reservation.id}
          carwashid={reservation.carwashId}
          rsvid={reservation.id}
          imgsrc={
            reservation.image
              ? reservation.image.url
              : "/CarwashDetail/CarwashImgNotFound.png"
          }
          reservedTime={reservation.time}
          bayname={`${reservation.carwashName}: 베이${reservation.bayNum}`}
          priceinfo={reservation.price}
          buttontype="review"
        />
      ))}
    </div>
  );
};

export default ReservationHistoryTemplate;
