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
import { UserInfo } from "../../apis/user";

/**
 * HomeTemplate
 *
 * @todo geoLocation이 동작하지 않는 문제 해결 필요.
 */
const HomeTemplate = () => {
  const [location, setLocation] = useState({
    latitude: 35.14,
    longitude: 126.9,
  });

  // 사용자 정보 상태
  const [userName, setUserName] = useState("");

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
  const [recommended, recent, userInfo] = useSuspenseQueries({
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
      {
        queryKey: ["userInfo"],
        queryFn: () => (token ? UserInfo(token) : Promise.resolve(null)),
        enabled: !!token,
      },
    ],
  });

  const recommendedData = recommended?.data?.data?.response[0];
  const recentList = recent?.data?.data?.response?.recent || [];
  useEffect(() => {
    if (userInfo.data?.data?.response?.name) {
      setUserName(userInfo.data.data.response.name);
    }
  }, [userInfo]);
  const navigate = useNavigate();
  return (
    <main className="grid gap-6 py-4">
      {userName && (
        <div className="text-lg font-semibold ">{userName}님 안녕하세요!</div>
      )}

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
