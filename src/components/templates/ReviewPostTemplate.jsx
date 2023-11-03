import React, { useState, useEffect } from "react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { StarPicker } from "../atoms/StarPicker";
import { BadgeSet } from "../molecules/BadgeSet";
import { useNavigate } from "react-router-dom";
import { Button } from "../atoms/Button";
import { getReviews, postReviews } from "../../apis/carwashes";
import { useSelector } from "react-redux";
const ReviewPostTemplate = () => {
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  // 임의의 carwashId와 reservationId 설정
  const carwashId = useSelector((state) => state.selectedCarwashId);
  const reservationId = useSelector((state) => state.selectedReservationId);

  const { data } = useSuspenseQuery({
    queryKey: ["getCarwashesInfo"],
    queryFn: () => getReviews(),
  });

  useEffect(() => {
    if (data) {
      setKeywords(data?.data?.response?.reviewKeyword);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (data) => {
      return postReviews(data);
    },
    onSuccess: () => {
      console.log("success");
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = () => {
    const payload = {
      carwashId,
      reservationId,
      keywordIdList: selectedKeywords,
      rate,
      comment,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="relative grid gap-6">
      <h1 className="text-2xl font-bold">예약한 세차장이 어땠나요?</h1>
      <StarPicker onRate={setRate} />
      <BadgeSet keywords={keywords} onSelectKeyword={setSelectedKeywords} />
      <textarea
        className="items-center h-40 p-4 rounded-lg resize-none bg-slate-100"
        placeholder="후기를 입력해주세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button variant="long" onClick={handleSubmit} className="fixed bottom-0">
        리뷰 등록하기{" "}
      </Button>
    </div>
  );
};

export default ReviewPostTemplate;
