import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StarPicker } from "../atoms/StarPicker";
import { BadgeSet } from "../molecules/BadgeSet";
import { useNavigate } from "react-router-dom";
import { Button } from "../atoms/Button";
import { getReviews, postReviews } from "../../apis/carwashes";
import { useSelector } from "react-redux";
import CustomModal from "../atoms/CustomModal";

const ReviewPostTemplate = () => {
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();

  const carwashId = useSelector((state) => state.selectedCarwashId);
  const reservationId = useSelector((state) => state.selectedReservationId);
  const handleError = (err) => {
    const { status } = err.response || {};
    if (status === 401) {
      setModalContent("로그인이 필요합니다.");
      setModalType("login");
      setIsModalOpen(true);
    } else if (status === 500) {
      setModalContent("서버 오류가 발생했습니다. 다시 시도하세요.");
      setIsModalOpen(true);
    } else if (status === 404) {
      navigate("/notfound");
    } else {
      setModalContent("알 수 없는 오류가 발생했습니다.");
      setIsModalOpen(true);
    }
  };

  const { data, error } = useQuery({
    queryKey: ["getCarwashesInfo"],
    queryFn: () => getReviews(),
    suspense: true,
    onError: handleError,
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
      console.log("리뷰 등록 성공");
      navigate("/history");
    },
    onError: handleError,
  });

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (modalType === "login" && error?.response?.status === 401) {
      navigate("/login");
    } else if (modalType === "info") {
    } else {
      navigate("/");
    }
    setModalType(null);
  };

  const handleSubmit = () => {
    if (rate === 0 || comment.trim().length === 0) {
      setModalContent(
        rate === 0 ? "별점을 선택해주세요." : "후기를 입력해주세요."
      );
      setModalType("info");
      setIsModalOpen(true);
      return;
    }
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
    <div className="relative grid gap-6 m-4">
      <div className="mt-8 text-2xl font-bold text-center">
        예약한 세차장이 어땠나요?
      </div>
      <StarPicker onRate={setRate} />
      <BadgeSet keywords={keywords} onSelectKeyword={setSelectedKeywords} />
      <textarea
        className="items-center h-40 p-4 bg-gray-100 border border-gray-300 rounded-lg resize-none"
        placeholder="후기를 입력해주세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        variant="long"
        onClick={handleSubmit}
        className="fixed bottom-0 left-0"
      >
        리뷰 등록하기
      </Button>
      <CustomModal
        isOpen={isModalOpen}
        onConfirm={handleModalConfirm}
        title={modalContent.includes("서버") ? "오류 발생" : "알림창"}
        content={modalContent}
        confirmText="확인"
      />
    </div>
  );
};

export default ReviewPostTemplate;
