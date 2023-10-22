import React, { useState, useEffect } from "react";
import ReservationItem from "../molecules/ReservationItem";

const ReservationHistoryTemplate = () => {
  const [currentReservations, setCurrentReservations] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [completedReservations, setCompletedReservations] = useState([]);

  useEffect(() => {
    fetch("/reservations/currentstaus")
      .then((res) => res.json())
      .then((data) => {
        setCurrentReservations(data.response.current);
        setUpcomingReservations(data.response.upcoming);
        setCompletedReservations(data.response.completed);
      })
      .catch((error) => {
        console.error("Error fetching reservation history:", error);
      });
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  return (
    <div className="grid gap-10">
      <div className="text-2xl font-bold">예약내역</div>

      <div className="grid gap-2">
        <div className="font-semibold">현재 진행중인 세차</div>
        {currentReservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            imgsrc="YOUR_IMAGE_URL" // Replace this with actual image URL if available in data
            reservetime={`${formatTimestamp(
              reservation.time.start
            )} ~ ${formatTime(reservation.time.end)}`}
            bayname={`${reservation.carwashName} : 베이${reservation.bayNum}`}
            priceinfo={`${reservation.price}원`}
          />
        ))}
      </div>

      <div className="grid gap-2">
        <div className="font-semibold">예정된 세차</div>
        {upcomingReservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            imgsrc="YOUR_IMAGE_URL" // Replace this with actual image URL if available in data
            reservetime={`${formatTimestamp(
              reservation.time.start
            )} ~ ${formatTime(reservation.time.end)}`}
            bayname={`${reservation.carwashName} : 베이${reservation.bayNum}`}
            priceinfo={`${reservation.price}원`}
            buttontype="cancel"
          />
        ))}
      </div>

      <div className="grid gap-2">
        <div className="font-semibold">완료한 세차</div>
        {completedReservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            imgsrc="YOUR_IMAGE_URL" // Replace this with actual image URL if available in data
            reservetime={`${formatTimestamp(
              reservation.time.start
            )} ~ ${formatTime(reservation.time.end)}`}
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
