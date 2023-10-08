import React, { useEffect, useState } from "react";
import Home from "/GNB/home.svg";
import HomeActive from "/GNB/homeActive.svg";
import Reservation from "/GNB/reservation.svg";
import ReservationActive from "/GNB/reservationActive.svg";
import ReservationList from "/GNB/reservationList.svg";
import ReservationListActive from "/GNB/reservationListActive.svg";
import { Link, useLocation } from "react-router-dom";

/**
 * GNB
 * - 아이폰으로 접속하는 경우 화면 하단 Home Indicator 공간 고려하여 padding-bottom 값 다르게 부여
 * - 현재 페이지 경로를 상태로 관리하여 접속중인 페이지 파란색으로 표시
 */
export const GNB = () => {
  // 현재 pathname을 상태로 관리
  const [currentPage, setCurrentPage] = useState("/");
  const location = useLocation();
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  // 모바일 OS에 따라 다른 padding-bottom (아이폰 32px, 이외 8px)
  const mobileType = navigator.userAgent.toLowerCase();
  const paddingByType = mobileType.indexOf("iphone") > -1 ? "mb-8" : "mb-2";

  // 메뉴 아이템 (메뉴명, 경로, 아이콘, 활성화된 아이콘)
  const menus = [
    { name: "홈", path: "/", icon: Home, iconActive: HomeActive },
    {
      name: "예약하기",
      path: "/reservation",
      icon: Reservation,
      iconActive: ReservationActive,
    },
    {
      name: "예약내역",
      path: "/reservationlist",
      icon: ReservationList,
      iconActive: ReservationListActive,
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full px-8 bg-gray-100 border border-t-gray-200">
      <div className={`wrapper flex justify-between mt-2 ${paddingByType}`}>
        {menus.map((menu, index) => {
          return (
            <Link className="w-12" key={index} to={menu.path}>
              <div className="text-center">
                <img
                  className="inline"
                  src={currentPage === menu.path ? menu.iconActive : menu.icon}
                  alt={menu.name}
                />
                <div
                  className={
                    currentPage === menu.path
                      ? "text-sky-500 text-xs"
                      : "text-xs"
                  }>
                  {menu.name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
