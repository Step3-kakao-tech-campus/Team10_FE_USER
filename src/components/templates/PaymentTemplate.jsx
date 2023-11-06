import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { calculatePayment } from "../../apis/carwashes";
import dayjs from "dayjs";
import { Button } from "../atoms/Button";
import { useNavigate } from "react-router-dom";

const PaymentTemplate = () => {
  const [paymentData, setPaymentData] = useState({ price: undefined });
  const reservations = useSelector((state) => state.reservations);
  const carwashId = useSelector((state) => state.selectedCarwashId); // CamelCase를 사용하여 변수명을 수정했습니다.
  const navigate = useNavigate();

  const { mutate, data, isLoading, isError, error } = useMutation({
    mutationFn: (data) => calculatePayment(carwashId, data),
    onSuccess: (data) => {
      // 결제 성공 후 data를 상태에 설정합니다.
      setPaymentData({ price: data.data.response.price }); // 이렇게 해서 반환된 결제 정보를 상태에 저장할 수 있습니다.
      console.log("Payment successful with data:", data.data.response.price);
      // 다음의 라인은 성공적인 결제 후에 필요한 로직을 처리합니다.
    },
    onError: (err) => {
      console.error("Payment error:", err);
      // navigate('/payment-error'); // 필요하다면 에러 페이지로 리디렉트할 수 있습니다.
    },
  });

  useEffect(() => {
    if (reservations && carwashId) {
      // mutate를 호출할 때 reservations 객체 전체를 data로 전달합니다.
      mutate(reservations);
    }
  }, [reservations, carwashId, mutate]);

  // UI 로딩 상태 표시
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // UI 에러 상태 표시
  if (isError) {
    return <div>Error: {error.message}</div>;
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
  const paymentAmount = paymentData?.price ? paymentData.price : "계산 중...";
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
            <div>{paymentAmount}원</div>
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
        {paymentAmount}원 결제하기
      </Button>
    </div>
  );
};

export default PaymentTemplate;
