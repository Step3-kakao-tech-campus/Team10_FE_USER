import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { carwashesReviews } from "../../apis/carwashes";
import ReviewList from "../molecules/ReviewList";
import KeywordReview from "./KeywordReview";
import UserStar from "./UserStar";
import { useSelector } from "react-redux";

const TabReview = ({}) => {
  const selectedCarwashId = useSelector((state) => state.selectedCarwashId);

  const {
    data: reviewsData,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["carwashesReviews", selectedCarwashId],
    queryFn: () => carwashesReviews(selectedCarwashId),
    suspense: true,
  });

  if (error) {
    return <div>Error loading reviews: {error.message}</div>;
  }

  if (isFetching) {
    return <div>Loading reviews...</div>;
  }

  const averageStar = reviewsData?.data?.response?.overview?.rate || 0;
  const totalReviews = reviewsData?.data?.response?.overview?.totalCnt || 0;
  const keywords = reviewsData?.data?.response?.overview?.reviewKeyword || [];

  const carwashreviews = reviewsData?.data?.response?.reviews?.map(
    (review) => ({
      rating: review.rate,
      username: review.username,
      date: review.created_at.split("T")[0],
      content: review.comment,
    })
  );

  const getKeywordText = (id) => {
    const keywordMapping = {
      1: "사장님이 친절해요",
      2: "간단한 용품을 팔아요",
      3: "휴게공간이 있어요",
      4: "가격이 합리적이에요",
      5: "타이어 공기를 넣을 수 있어요",
      6: "매장이 깨끗해요",
      7: "여름엔 시원하고 겨울엔 깨끗해요",
    };

    return keywordMapping[id] || "존재하지 않음";
  };

  return (
    <Suspense fallback={<div>Loading reviews...</div>}>
      <div>
        <div className="grid gap-2 py-4">
          <div className="font-semibold">평균별점</div>
          <div>
            <UserStar averageStar={averageStar} />
          </div>
          <hr />
          <div className="py-2 font-semibold">키워드 리뷰</div>
          <div className="grid gap-2">
            {keywords.map((keywordData) => (
              <KeywordReview
                key={keywordData.id}
                keyword={getKeywordText(keywordData.id)}
                reviewCount={keywordData.count}
                totalReviews={totalReviews}
              />
            ))}
          </div>
          <hr />
          <div className="py-2 font-semibold">
            리뷰 {carwashreviews?.length || 0}건
          </div>
          <ReviewList reviews={carwashreviews} />
        </div>
      </div>
    </Suspense>
  );
};

export default TabReview;
