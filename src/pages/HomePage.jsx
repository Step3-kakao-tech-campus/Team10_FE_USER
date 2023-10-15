import React from "react";
import { Button } from "../components/atoms/Button";
import Reservation from "/Button/home/reservation.svg";
import ReservationHistory from "/Button/home/reservationHistory.svg";
import Image from "/RecentCarwashItem/image.png";
import { RecentCarwashSlider } from "../components/organisms/RecentCarwashSlider";
import { CarwashCard } from "../components/molecules/CarwashCard";

export const HomePage = () => {
  // 최근 이용 내역 컴포넌트 사용시 아래 배열 주석 해제해서 사용
  const recentList = [
    {
      carwashId: 3,
      image: Image,
      date: "2023/10/04",
      carwashName: "포세이돈워시 용봉점",
    },
    {
      carwashId: 4,
      image: Image,
      date: "2023/10/03",
      carwashName: "셀프세차장 썬카클리닉",
    },
    {
      carwashId: 3,
      image: Image,
      date: "2023/10/02",
      carwashName: "포세이돈워시 용봉점",
    },
    {
      carwashId: 3,
      image: Image,
      date: "2023/10/02",
      carwashName: "포세이돈워시 용봉점",
    },
    {
      carwashId: 3,
      image: Image,
      date: "2023/10/02",
      carwashName: "포세이돈워시 용봉점",
    },
    {
      carwashId: 3,
      image: Image,
      date: "2023/10/02",
      carwashName: "포세이돈워시 용봉점",
    },
    {
      carwashId: 3,
      image: Image,
      date: "2023/10/02",
      carwashName: "포세이돈워시 용봉점",
    },
  ];
  return (
    <>
      <main className="grid gap-6">
        <h1 className="text-2xl font-semibold">노주영님 안녕하세요!</h1>
        {/* 메뉴 링크 */}
        <section className="flex justify-between gap-4">
          <Button
            type="home"
            icon={Reservation}
            label="내 주변 세차장 예약하기"
          />
          <Button type="home" icon={ReservationHistory} label="예약하기" />
        </section>

        {/* 이런 세차장 어때요? */}
        <section className="grid gap-4">
          <h2 className="text-xl font-semibold">이런 세차장 어때요?</h2>
          <CarwashCard />
        </section>

        {/* 최근 이용 내역 */}
        <section className="grid gap-4">
          <h2 className="text-xl font-semibold">최근 이용 내역</h2>
          <RecentCarwashSlider recentList={recentList} />
        </section>
      </main>
    </>
  );
};
