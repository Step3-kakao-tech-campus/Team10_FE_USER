import React, { useState, useEffect } from "react";
import ReservationItem from "../molecules/ReservationItem";
import { useQuery } from "@tanstack/react-query";
import { reservationsCurrentstatus } from "../../apis/reservations";
import dayjs from "dayjs";
import { Button } from "../atoms/Button";
import { useNavigate } from "react-router-dom";

const ReservationHistoryTemplate = () => {
  const [currentReservations, setCurrentReservations] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [completedReservations, setCompletedReservations] = useState([]);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["getHistory"],
    queryFn: reservationsCurrentstatus,
    suspense: true,
  });

  useEffect(() => {
    if (data) {
      setCurrentReservations(data?.data?.response?.currentReservationList);
      setUpcomingReservations(data?.data?.response?.upcomingReservationList);
      setCompletedReservations(data?.data?.response?.completeReservationList);
    }
  }, [data]);

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
    <div className="relative">
      <div className="flex-grow pb-16">
        <div className="py-4 text-2xl font-bold text-primary">예약내역</div>

        <div className="py-2 text-lg font-semibold">현재 진행중인 세차</div>
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
            reservetime={
              <>
                {formatTimestamp(reservation.time.start).date}
                <br />
                {formatTimestamp(reservation.time.start).time} -{" "}
                {formatTime(reservation.time.end)}
              </>
            }
            bayname={`${reservation.carwashName}: 베이${reservation.bayNum}`}
            priceinfo={`${reservation.price.toLocaleString()}원`}
          />
        ))}
        <hr className="mb-8" />
        <div className="py-2 text-lg font-semibold">예정된 세차</div>
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
              reservetime={
                <>
                  {formatTimestamp(reservation.time.start).date}
                  <br />
                  {formatTimestamp(reservation.time.start).time} -{" "}
                  {formatTime(reservation.time.end)}
                </>
              }
              bayname={`${reservation.carwashName}: 베이${reservation.bayNum}`}
              priceinfo={`${reservation.price.toLocaleString()}원`}
              buttontype="cancel"
            />
          ))
        ) : (
          <div>
            <div>예정된 세차가 없습니다. 세차장 예약을 시작해보세요!</div>
            <Button
              variant="long"
              className="my-4 bg-yellow-400 rounded-md"
              onClick={() => navigate("/reservation")}
            >
              예약하러 가기
            </Button>
          </div>
        )}

        <hr className="mb-8" />
        <div className="py-2 text-lg font-semibold">완료한 세차</div>
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
            reservetime={
              <>
                {formatTimestamp(reservation.time.start).date}
                <br />
                {formatTimestamp(reservation.time.start).time} -{" "}
                {formatTime(reservation.time.end)}
              </>
            }
            bayname={`${reservation.carwashName}: 베이${reservation.bayNum}`}
            priceinfo={`${reservation.price.toLocaleString()}원`}
            buttontype="review"
          />
        ))}
      </div>
    </div>
  );
};

export default ReservationHistoryTemplate;
