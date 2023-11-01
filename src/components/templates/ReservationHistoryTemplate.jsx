import React, { useState, useEffect } from "react";
import ReservationItem from "../molecules/ReservationItem";
import { useSuspenseQuery } from "@tanstack/react-query";
import { reservationsCurrentstatus } from "../../apis/reservations";
import dayjs from "dayjs";

const ReservationHistoryTemplate = () => {
  const [currentReservations, setCurrentReservations] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [completedReservations, setCompletedReservations] = useState([]);

  const { data } = useSuspenseQuery({
    queryKey: ["getHistory"],
    queryFn: () => reservationsCurrentstatus(),
  });

  useEffect(() => {
    if (data) {
      setCurrentReservations(data?.data?.response?.current);
      setUpcomingReservations(data?.data?.response?.upcoming);
      setCompletedReservations(data?.data?.response?.completed);
      console.log(data?.data?.response);
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
    <div className="relative p-4">
      <div className="flex-grow pb-12 overflow-y-scroll">
        <div className="py-4 text-2xl font-bold text-primary">예약내역</div>

        <div className="py-4 font-semibold">현재 진행중인 세차</div>
        {currentReservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            bayid={reservation.id}
            imgsrc={reservation.image}
            reservetime={
              <>
                {formatTimestamp(reservation.time.start).date}
                <br />
                {formatTimestamp(reservation.time.start).time} -{" "}
                {formatTime(reservation.time.end)}
              </>
            }
            bayname={`${reservation.carwashName} 베이${reservation.bayNum}`}
            priceinfo={`${reservation.price}원`}
          />
        ))}
        <hr className="mt-8" />
        <div className="py-4 font-semibold">예정된 세차</div>
        {upcomingReservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            bayid={reservation.id}
            imgsrc={reservation.image}
            reservetime={
              <>
                {formatTimestamp(reservation.time.start).date}
                <br />
                {formatTimestamp(reservation.time.start).time} -{" "}
                {formatTime(reservation.time.end)}
              </>
            }
            bayname={`${reservation.carwashName} : 베이${reservation.bayNum}`}
            priceinfo={`${reservation.price}원`}
            buttontype="cancel"
          />
        ))}
        <hr className="mt-8" />
        <div className="py-4 font-semibold">완료한 세차</div>
        {completedReservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            bayid={reservation.id}
            imgsrc={reservation.image}
            reservetime={
              <>
                {formatTimestamp(reservation.time.start).date}
                <br />
                {formatTimestamp(reservation.time.start).time} -{" "}
                {formatTime(reservation.time.end)}
              </>
            }
            bayname={`${reservation.carwashName} : 베이${reservation.bayNum}`}
            priceinfo={`${reservation.price}원`}
            buttontype="review"
          />
        ))}
      </div>
    </div>
  );
};

export default ReservationHistoryTemplate;
