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
import Logo from "/bdbd_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const HomeTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [location, setLocation] = useState({
    latitude: 35.14,
    longitude: 126.9,
  });

  const { isLoggedIn, userName } = useSelector((state) => state.auth);

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

  const [recommended, recent] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["recommended"],
        queryFn: () =>
          carwashesRecommended(location.latitude, location.longitude),
      },
      {
        queryKey: ["recent"],
        queryFn: () =>
          isLoggedIn ? reservationsRecent() : Promise.resolve(null),
      },
    ],
  });

  const recommendedData = recommended?.data?.data?.response[0];
  const recentList = recent?.data?.data?.response?.recent || [];

  return (
    <div className="grid-8">
      <nav className="items-center bg-white flex-between">
        <img src={Logo} alt="뒤로가기" onClick={() => navigate(-1)} />
        {isLoggedIn ? (
          <Button
            onClick={() => {
              dispatch(logout());
            }}>
            로그아웃
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
            }}>
            로그인
          </Button>
        )}
      </nav>
      <div className="text-2xl font-bold">
        {userName
          ? `${userName}님 안녕하세요!`
          : "여유롭게 즐기는 세차, 뽀득뽀득"}
      </div>
      <section className="gap-4 flex-between">
        <Button
          variant="home"
          onClick={() => {
            navigate("/reservation");
          }}>
          내 주변 세차장 예약하기
          <img
            className="absolute right-2 -bottom-4"
            src={Reservation}
            alt="위치 아이콘"
          />
        </Button>
        <Button
          variant="home"
          onClick={() => {
            navigate("/history");
          }}>
          예약내역 보기
          <img
            className="absolute right-2 -bottom-4"
            src={ReservationHistory}
            alt="예약내역 아이콘"
          />
        </Button>
      </section>
      <section className="grid-4">
        <div className="text-xl font-semibold">이런 세차장 어때요?</div>
        {recommendedData && (
          <CarwashCard
            id={recommendedData.id}
            image={recommendedData.image}
            name={recommendedData.name}
            address={recommendedData.location.address}
            rate={recommendedData.rate}
            reviewCount={recommendedData.reviewCount}
            distance={recommendedData.distance}
          />
        )}
      </section>
      {isLoggedIn && (
        <section className="grid-4">
          <div className="text-xl font-semibold">최근 이용 내역</div>
          {recentList.length === 0 ? (
            <div className="text-center ">최근 이용 내역이 없습니다.</div>
          ) : (
            <RecentCarwashSlider recentList={recentList} />
          )}
        </section>
      )}
    </div>
  );
};
export default HomeTemplate;
