import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSuspenseQuery } from "@tanstack/react-query";
import { paymentResult } from "../../apis/reservations";
import dayjs from "dayjs";
import { Button } from "../atoms/Button";
import { useNavigate } from "react-router-dom";

const PaymentTemplate = ({ reservationId }) => {
  const [paymentdata, setData] = useState(null);
  const reservations = useSelector((state) => state.reservations);
  const navigate = useNavigate();

  const { data } = useSuspenseQuery({
    queryKey: ["getPayment", reservationId],
    queryFn: () => paymentResult(reservationId),
    enabled: !!reservationId,
  });

  useEffect(() => {
    if (data) {
      setData(data?.data?.response);
    }
  }, [data]);

  if (!paymentdata) {
    return <div>Loading...</div>;
  }

  const formatDateStart = (dateString) => {
    const datePart = dayjs(dateString).format("YYYY년 MM월 DD일");
    const timePart = dayjs(dateString).format("HH시 mm분");
    return { datePart, timePart };
  };

  const formatDateEnd = (dateString) => {
    return dayjs(dateString).format("HH시 mm분");
  };

  const calculateDuration = (start, end) => {
    const duration = dayjs(end).diff(dayjs(start), "minute");
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}시간` + (minutes > 0 ? ` ${minutes}분` : "");
  };

  const { datePart, timePart } = formatDateStart(reservations.startTime);
  const endTimeFormatted = formatDateEnd(reservations.endTime);

  const duration = calculateDuration(
    reservations.startTime,
    reservations.endTime
  );

  return (
    <div>
      <div className="relative p-4">
        <div className="py-8 text-2xl font-bold"> 결제하기</div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="text-lg font-semibold">예약 일정</div>
          <div className="text-right">
            <div>{datePart}</div>
            <div>
              {timePart} - {endTimeFormatted} ({duration})
            </div>
          </div>
          <div className="flex justify-between py-4 text-lg font-semibold text-red-500">
            <div>최종 결제 금액</div>
            <div>{paymentdata.total_price}원</div>
          </div>
        </div>
        <div className="py-8 text-2xl font-bold"> 결제 수단 </div>
        <div className="flex flex-col gap-4">
          <button className="w-full py-4 text-lg font-bold bg-yellow-300 rounded-lg">
            카카오페이
          </button>
          <button className="w-full py-4 text-lg font-bold bg-green-400 rounded-lg">
            네이버페이
          </button>
        </div>
      </div>
      <Button
        variant="long"
        className="fixed bottom-0 left-0"
        //onClick={() => navigate(`paymentresult/${reservationId}`)}
      >
        {paymentdata.total_price}원 결제하기
      </Button>
    </div>
  );
};

export default PaymentTemplate;
