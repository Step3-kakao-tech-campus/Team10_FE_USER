import { useSuspenseQueries } from "@tanstack/react-query";
import { Button } from "../atoms/Button";
import { CarwashCard } from "../molecules/CarwashCard";
import { RecentCarwashSlider } from "../organisms/RecentCarwashSlider";
import Reservation from "/Button/home/reservation.svg";
import ReservationHistory from "/Button/home/reservationHistory.svg";
import { carwashesRecommended } from "../../apis/carwashes";
import { reservationsRecent } from "../../apis/reservations";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * HomeTemplate
 *
 * @todo geoLocation이 동작하지 않는 문제 해결 필요.
 */
const HomeTemplate = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const token = localStorage.getItem("token");
  const [recommended, recent] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["recommended"],
        queryFn: () =>
          carwashesRecommended(location.latitude, location.longitude),
      },
      {
        queryKey: ["recent"],
        queryFn: () => (token ? reservationsRecent() : Promise.resolve(null)),
        enabled: !!token,
      },
    ],
  });

  console.log(location);

  const recommendedData = recommended?.data?.data?.response;
  const recentList = recent?.data?.data?.response?.recent || [];
  const navigate = useNavigate();

  return (
    <main className="grid gap-6 py-12">
      {/*사용자 이름 데이터 있을 때 처리
       <h1 className="text-2xl font-semibold">노주영님 안녕하세요!</h1>*/}
      {/* 메뉴 링크 */}
      <section className="flex justify-between gap-4">
        <Button
          variant="home"
          onClick={() => {
            navigate("/reservation");
          }}
        >
          내 주변 세차장 예약하기
          <img
            className="absolute right-4 -bottom-4"
            src={Reservation}
            alt="위치 아이콘"
          />
        </Button>
        <Button
          variant="home"
          onClick={() => {
            navigate("/history");
          }}
        >
          예약내역 보기
          <img
            className="absolute right-4 -bottom-4"
            src={ReservationHistory}
            alt="예약내역 아이콘"
          />
        </Button>
      </section>
      {/* 이런 세차장 어때요? */}
      <section className="grid gap-4">
        <h2 className="text-xl font-semibold">이런 세차장 어때요?</h2>
        <CarwashCard
          id={recommendedData.id}
          image={recommendedData.image}
          name={recommendedData.name}
          address={recommendedData.location.address}
          rate={recommendedData.rate}
          reviewCount={recommendedData.reviewCount}
          distance={recommendedData.distance}
        />
      </section>
      {/* 최근 이용 내역 */}
      {token && (
        <section className="grid gap-4">
          <h2 className="text-xl font-semibold">최근 이용 내역</h2>
          <RecentCarwashSlider recentList={recentList} />
        </section>
      )}
    </main>
  );
};
export default HomeTemplate;
