import ReviewList from "../molecules/ReviewList";
import KeywordReview from "./KeywordReview";
import UserStar from "./UserStar";
import { useEffect, useState } from "react";
const TabReview = () => {
  const averageStar = 4.5;

  const [carwashreviews, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("/carwashes/reviews")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReview(data.response);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!carwashreviews) return null;

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
    {
      rating: 4.5,
      username: "사용자2",
      date: "2023-09-16",
      content: "좋은 경험이었습니다. 깔끔하고 친절한 서비스였어요.",
    },
    {
      rating: 4.5,
      username: "사용자2",
      date: "2023-09-16",
      content: "좋은 경험이었습니다. 깔끔하고 친절한 서비스였어요.",
    },
    {
      rating: 4.5,
      username: "사용자2",
      date: "2023-09-16",
      content: "좋은 경험이었습니다. 깔끔하고 친절한 서비스였어요.",
    },
    {
      rating: 4.5,
      username: "사용자2",
      date: "2023-09-16",
      content: "좋은 경험이었습니다. 깔끔하고 친절한 서비스였어요.",
    },
  ];

  // api 문서를 보면 각각의 review에 keywordidlist가 id(int) 속성으로 개별적으로 부여되어 있고,
  // 해당 keyword의 총 개수 이런 건 없는데 어떻게 처리할 지 생각해 봐야 할 것 같아요.
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

  return (
    <div>
      <div className="grid gap-2">
        <div className="font-semibold">평균별점</div>
        <div>
          <UserStar averageStar={averageStar} />
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
