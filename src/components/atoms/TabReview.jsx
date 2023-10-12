import React, { useEffect, useState } from "react";
import ReviewList from "../molecules/ReviewList";
import KeywordReview from "./KeywordReview";
import UserStar from "./UserStar";

const TabReview = () => {
  const reviews = [
    {
      rating: 5.0,
      username: "사용자1",
      date: "2023-09-15",
      content:
        "즐겁게 세차하고 왔습니다. 아침 일찍 세차하느라 배고팠는데 사장님께서 빵과 시원한 커피 주셔서 맛있게 먹었습니다!",
    },
    {
      rating: 4.5,
      username: "사용자2",
      date: "2023-09-16",
      content: "좋은 경험이었습니다. 깔끔하고 친절한 서비스였어요.",
    },
  ];

  const KeywordReviewData = [
    { keyword: "여름엔 시원하고 겨울엔 따뜻해요", reviewCount: 20 },
    { keyword: "사장님이 친절해요", reviewCount: 120 },
    { keyword: "가격이 합리적이에요", reviewCount: 50 },
  ];

  const sortedKeywordReviewData = [...KeywordReviewData].sort(
    (a, b) => b.reviewCount - a.reviewCount
  );

  const totalReviews = KeywordReviewData.reduce(
    (total, data) => total + data.reviewCount,
    0
  );

  const [averageStar, setAverageStar] = useState(0);

  useEffect(() => {
    setAverageStar(3.5);
  }, []);

  return (
    <div>
      <div className="grid gap-2">
        <div className="font-semibold">평균별점</div>
        <div>
          <UserStar popularity={averageStar} />
        </div>
        <hr />
        <div className="font-semibold">키워드 리뷰</div>
        <div className="grid gap-2">
          {sortedKeywordReviewData.map((data, index) => (
            <KeywordReview
              key={index}
              keyword={data.keyword}
              reviewCount={data.reviewCount}
              totalReviews={totalReviews}
            />
          ))}
        </div>
        <hr />
        <div className="font-semibold">리뷰 432건</div>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default TabReview;
