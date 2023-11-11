import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { calculatePayment } from "../../apis/carwashes";
import { pgpayment } from "../../apis/payment";
import dayjs from "dayjs";
import { Button } from "../atoms/Button";
import CustomModal from "../atoms/CustomModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";
import KakaoPayIcon from "/payment_icon_yellow_small.png";
import { getErrorDetail } from "../../layouts/errorswitch";

const PaymentTemplate = () => {
  const [paymentData, setPaymentData] = useState({ price: undefined });
  const [redirectLink, setRedirectLink] = useState(null);
  const [failmodalContent, setFailmodalContent] = useState("");
  const reservations = useSelector(
    (state) => state.reservationProcess.reservations
  );
  const carwashId = useSelector(
    (state) => state.reservationProcess.selectedCarwashId
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bayId = useSelector((state) => state.reservationProcess.selectedBayId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: paymentCalMutate } = useMutation({
    mutationFn: (data) => calculatePayment(bayId, data),
    onSuccess: (data) => {
      setPaymentData({ price: data.data.response.price });
    },
    onError: (error) => {
      const errorDetail = getErrorDetail(error);
      setFailmodalContent(errorDetail);
      setIsModalOpen(true);
    },
  });

  const { mutate: payMutate } = useMutation({
    mutationFn: (data) => pgpayment(data),
    onSuccess: (data) => {
      console.log("data", data);
      dispatch({ type: "SAVE_TID", payload: data?.data?.response?.tid });

      if (isMobile) {
        setRedirectLink(data?.data?.response?.next_redirect_mobile_url);
      } else {
        setRedirectLink(data?.data?.response?.next_redirect_pc_url);
      }
    },
    onError: (err) => {
      console.error("Payment error:", err);
    },
  });
  useEffect(() => {
    if (redirectLink) {
      window.location.href = redirectLink;
    }
  }, [redirectLink]);

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handlePayment = () => {
    if (!bayId || !reservations.startTime || !reservations.endTime) {
      setIsModalOpen(true);
      return;
    }
    const paypostData = {
      requestDto: {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name: "결제하기",
        quantity: 1,
        total_amount: paymentData?.price,
        tax_free_amount: 0,
      },
      saveDTO: {
        bayId: bayId,
        startTime: reservations.startTime,
        endTime: reservations.endTime,
      },
    };
    if (carwashId) {
      payMutate(paypostData);
    }
  };

  useEffect(() => {
    if (reservations && carwashId) {
      paymentCalMutate(reservations);
    }
  }, [reservations, carwashId, paymentCalMutate]);

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

  const modalContent = (
    <div className="flex flex-col gap-2">
      <div>누락된 데이터가 있습니다. 예약을 처음부터 시도해 주세요.</div>
    </div>
  );
  return (
    <div>
      <div className="p-4 grid-4">
        <div className="text-2xl font-bold">결제하기</div>
        <div className="p-4 bg-gray-100 rounded-xl grid-4">
          <div>
            <div className="text-lg font-semibold">예약 일정</div>
            <div className="text-right">
              <div>{datePart}</div>
              <div>
                {timePart} - {endTimeFormatted} ({duration})
              </div>
            </div>
          </div>
          <div className="flex justify-between text-lg font-semibold text-red-500">
            <div>최종 결제 금액</div>
            <div>{paymentAmount}원</div>
          </div>
        </div>
      </div>
      <Button
        className="fixed bottom-0 w-full p-4 text-center bg-kakao"
        onClick={handlePayment}
      >
        <div className="flex items-center text-xl font-semibold bg-kakao">
          <img src={KakaoPayIcon} alt="카카오페이 아이콘" className="block" />
          <div>{paymentAmount}원 결제하기</div>
        </div>
      </Button>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="누락 오류"
        content={failmodalContent ? failmodalContent : modalContent}
        confirmText="확인"
      />
    </div>
  );
};

export default PaymentTemplate;
