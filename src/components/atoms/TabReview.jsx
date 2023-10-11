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
      content: "즐겁게 세차하고 왔습니다. 아침 일찍 세차하느라 배고팠는데 사장님께서 빵과 시원한 커피 주셔서 맛있게 먹었습니다!",
    },
    {
      rating: 4.5,
      username: "사용자2",
      date: "2023-09-16",
      content: "좋은 경험이었습니다. 깔끔하고 친절한 서비스였어요.",
    }
  ];

  const KeywordReviewData = [
    { keyword: "여름엔 시원하고 겨울엔 따뜻해요", reviewCount: 192 },
    { keyword: "사장님이 친절해요", reviewCount: 102 },
    { keyword: "가격이 합리적이에요", reviewCount: 24 },
  ];

  const [averageStar, setAverageStar] = useState(0);

  useEffect(() => {
    setAverageStar(3.5); 
  }, []);

  return (
    <div>
      <div className=" overflow-y-auto">
        <div className="text-left text-lg font-semibold ml-4 mt-2">평균별점</div>
        <div className="ml-4 my-2">
          <UserStar popularity={averageStar} /> 
        </div>
        <hr/>
        <div className="text-left text-lg font-semibold ml-4 mt-2">키워드 리뷰</div>
        <div className="mt-4 mx-2 justify-center">
          {KeywordReviewData.map((data, index) => (
            <KeywordReview
              key={index}
              keyword={data.keyword}
              reviewCount={data.reviewCount}
            />
          ))}
        </div>
        <div className="text-left text-lg font-semibold ml-4 mt-4">리뷰 432건</div>
        <div>
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default TabReview;
