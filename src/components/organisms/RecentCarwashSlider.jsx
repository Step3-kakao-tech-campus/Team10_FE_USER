import React from "react";
import { RecentCarwashItem } from "../molecules/RecentCarwashItem";

/**
 * RecentCarwashSlider
 * @param {Array} recentList
 *
 * 홈화면 최하단 최근 이용내역 컴포넌트입니다.
 * 사용자의 최근 세차장 이용내역을 RecentCarwashItem으로 나열하여
 * 가로 스크롤 형태로 보여줍니다.
 */
export const RecentCarwashSlider = ({ recentList }) => {
  return (
    <div className="flex gap-4 overflow-x-auto flex-nowrap scrollbar-hide">
      {recentList.map((item, index) => {
        return (
          <RecentCarwashItem
            key={index}
            image={item.image}
            carwashId={item.carwashId}
            reservationDate={item.date}
            carwashName={item.carwashName}
          />
        );
      })}
    </div>
  );
};
