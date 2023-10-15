const carwashes_introduction = {
  success: true,
  response: {
    name: "세차장 이름",
    rate: "세차장 별점",
    review_cnt: "세차장 리뷰 갯수",
    location: {
      placeName: "장소",
      address: "주소",
    },
    bayCnt: "예약 가능 베이 갯수",
    optime: {
      weekday: {
        start: "09:00:00",
        end: "17:00:00",
      },
      weekend: {
        start: "10:00:00",
        end: "16:00:00",
      },
    },
    image: ["image1.jpg", "image2.jpg"],
    keywordId: [1, 2, 3],
    description: "테스트 설명",
    tel: "01012345678",
  },
  error: null,
};

export default carwashes_introduction;
