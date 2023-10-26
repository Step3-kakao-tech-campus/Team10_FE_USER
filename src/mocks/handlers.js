import { rest } from "msw";

// 모든 response가 형식에 맞는지 확인 (success, response, error)
export const handlers = [
  // 사용자 회원가입
  // 회원가입 성공 시 200 응답
  // 회원가입 실패 시 401 응답 (형식에 맞지 않는 경우)
  rest.post("/join/user", (req, res, ctx) => {
    const { username, email, password, tel } = req.body;

    const regex = {
      email: /^\w[\w._%+-]+@\w[\w.-]+\.[a-zA-Z]{2,6}$/,
      password:
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!~`<>,./?;:'"\[\]{}\\()|_-])\S*$/,
    };

    function validate(field, isValid, message) {
      if (!isValid) {
        return res(
          ctx.status(401),
          ctx.json({
            success: false,
            response: null,
            error: { message: message, status: 401 },
          })
        );
      }
    }

    const validators = [
      {
        field: "username",
        isValid: username && username.length >= 8 && username.length <= 45,
        message: "사용자 이름은 8-45자 사이여야 합니다.",
      },
      {
        field: "email",
        isValid: email && regex.email.test(email),
        message: "이메일 형식으로 작성해주세요.",
      },
      {
        field: "password",
        isValid:
          password &&
          regex.password.test(password) &&
          password.length >= 8 &&
          password.length <= 45,
        message: "비밀번호 형식이 올바르지 않습니다.",
      },
      {
        field: "tel",
        isValid: tel && tel.length >= 9 && tel.length <= 14,
        message: "전화번호 형식이 올바르지 않습니다.",
      },
    ];

    for (const { field, isValid, message } of validators) {
      const response = validate(field, isValid, message);
      if (response) return response;
    }

    return res(ctx.json({ success: true, response: null, error: null }));
  }),

  // 사용자 로그인
  // 로그인 성공 시 헤더에 토큰 담아서 보내줌
  rest.post("/login/user", (req, res, ctx) => {
    const { email, password } = req.body;

    if (email !== "user@nate.com" || password !== "user1234!") {
      return res(
        ctx.status(401),
        ctx.json({
          success: false,
          response: null,
          error: "인증에 실패했습니다.",
        })
      );
    }

    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc2FyQG5hdGUuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImlkIjoxLCJleHAiOjE2ODcwNTM5MzV9.fXlD0NZQXYYfPHV8rokRJTM86nhS869LZ1KIGi7_qvPOcVbXgvyZLKvnlLxomIiS3YFnQRLzXAJ2G41yI_AmGg";

    return res(
      ctx.set("authorization", `Bearer ${token}`),
      ctx.status(200),
      ctx.json({
        success: true,
        response: null,
        error: null,
      })
    );
  }),

  // 유저 주변 추천 세차장 조회
  // 세차장 사진, 별점, 세차장 이름, 주소, 현위치로부터의 거리를 불러온다.
  rest.get("/carwashes/recommended", (req, res, ctx) => {
    const { u_latitude, u_longitude } = req.params;
    // const distance = calculateDistance(u_latitude, u_longitude);

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          id: 2,
          name: "하이세차장",
          image:
            "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
          location: {
            id: 1,
            place: "새로운 이름",
            address: "새로운 주소",
            latitude: 1.234,
            longitude: 2.345,
          },
          distance: 5125,
          rate: 5.0,
          price: 2000,
        },
        error: null,
      })
    );
  }),

  // 위치 기반 세차장 리스트 조회
  // 예약하기 탭 클릭시 바로 호출되는 API
  rest.get("/carwashes/nearby", (req, res, ctx) => {
    const { u_latitude, u_longitude } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: [
          {
            id: 2,
            name: "하이세차장",
            image:
              "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
            location: {
              id: 18,
              place: "새로운 이름",
              address: "새로운 주소",
              latitude: 1.234,
              longitude: 2.345,
            },
            distance: 2513,
            rate: 5.0,
            price: 2000,
          },
          {
            id: 3,
            name: "무슨무슨세차장",
            image:
              "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
            location: {
              id: 18,
              place: "새로운 이름",
              address: "새로운 주소",
              latitude: 1.234,
              longitude: 2.345,
            },
            distance: 4189,
            rate: 5.0,
            price: 2000,
          },
        ],
        error: null,
      })
    );
  }),

  // 키워드 기반 세차장 리스트 조회
  rest.get("/carwashes/search", (req, res, ctx) => {
    const { u_latitude, u_longitude } = req.params;
    const queryString = req.url.split("?")[1];

    const queryParams = queryString.split("&");

    let keywordIds = [];

    queryParams.forEach((param) => {
      const [key, value] = param.split("=");

      if (key === "keywordIds") {
        keywordIds = value.split(",").map(Number);
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: [
          {
            id: 2,
            name: "하이세차장",
            image:
              "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
            location: {
              id: 18,
              place: "새로운 이름",
              address: "새로운 주소",
              latitude: 1.234,
              longitude: 2.345,
            },
            distance: 2513,
            rate: 5.0,
            price: 2000,
          },
          {
            id: 3,
            name: "무슨무슨세차장",
            image:
              "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
            location: {
              id: 18,
              place: "새로운 이름",
              address: "새로운 주소",
              latitude: 1.234,
              longitude: 2.345,
            },
            distance: 4189,
            rate: 5.0,
            price: 2000,
          },
        ],
        error: null,
      })
    );
  }),

  // 세차장 상세 정보 조회 (리뷰 제외)
  rest.get("/carwashes/:carwash_id/info", (req, res, ctx) => {
    const { carwash_id } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          id: parseInt(carwash_id, 10),
          name: "포세이돈워시 용봉점",
          rate: 5.0,
          reviewCnt: 408,
          location: {
            placeName: "포세이돈워시 용봉점",
            address: "광주 북구 용봉동 111-1",
          },
          bayCnt: 4,
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
          image: [
            "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
            "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/16b2ae1e-d904-48fc-b1e2-660b38c25c3f",
            "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/fdb8f53b-08eb-4b35-8b89-0394473c2d7b",
            "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/1572934c-920f-4e84-a3d3-dcb4506eea13",
            "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/4f3ae17e-c247-4e5d-917e-adc8dfc67c20",
            "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/c51a6881-3ba5-46e8-b4f5-e352dee0ac9e",
          ],
          keywordId: [1, 2, 3],
          description: "포세이돈워시에 어서옵셔",
          tel: "01012345678",
        },
        error: null,
      })
    );
  }),

  // 세차장 상세 정보 조회 (리뷰만))
  rest.get("/carwashes/:carwash_id/reviews", (req, res, ctx) => {
    const { carwash_id } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          overview: {
            rate: 5.0, // 세차장 평균 별점
            totalCnt: 5, // 전체 리뷰 갯수
            reviewKeyword: [
              // 세차장 리뷰관련 키워드 갯수(통계)
              {
                id: 3, // 키워드 id
                count: 5, // 관련된 리뷰 갯수
              },
              {
                id: 4,
                count: 3,
              },
            ],
          },
          reviews: [
            {
              rate: 5.0,
              username: "imnewuser",
              created_at: "2023-10-21T18:45",
              comment: "좋네여",
              keywordIdList: [3, 4],
            },
            {
              rate: 5.0,
              username: "imnewuser",
              created_at: "2023-10-21T18:46",
              comment: "괜찮은듯",
              keywordIdList: [3, 4],
            },
            {
              rate: 5.0,
              username: "imnewuser",
              created_at: "2023-10-21T18:47",
              comment: "ㅇㅈㅇㅈ",
              keywordIdList: [3],
            },
            {
              rate: 5.0,
              username: "imnewuser",
              created_at: "2023-10-21T18:47",
              comment: "얼쑤",
              keywordIdList: [3],
            },
            {
              rate: 5.0,
              username: "imnewuser",
              created_at: "2023-10-21T18:49",
              comment: "하하호호",
              keywordIdList: [3, 4],
            },
          ],
        },
        error: null,
      })
    );
  }),

  // 리뷰 등록 - 키워드 불러오기
  rest.get("/reviews", (req, res, ctx) => {
    const token = req.headers.get("authorization");

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    const { reservation_id } = req.body;

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          reviewKeyword: [
            { id: 1, keyword: "사장님이 친절해요" },
            { id: 2, keyword: "간단한 용품을 팔아요" },
            { id: 3, keyword: "휴게공간이 있어요" },
            { id: 4, keyword: "가격이 합리적이예요" },
            { id: 5, keyword: "타이어 공기를 넣을 수 있어요" },
            { id: 6, keyword: "매장이 깨끗해요" },
            { id: 7, keyword: "여름엔 시원하고 겨울엔 따뜻해요" },
          ],
        },
        error: null,
      })
    );
  }),

  // 리뷰 등록
  rest.post("/reviews", (req, res, ctx) => {
    const token = req.headers.get("authorization");

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    const { carwashId, reservationId, keywordIdList, rate, comment } = req.body;

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: null,
        error: null,
      })
    );
  }),

  // 세차장별 예약 내역 조회 (베이 선택 페이지)
  rest.get("/carwashes/:carwash_id/bays", (req, res, ctx) => {
    const { carwash_id } = req.params;
    const token = req.headers.get("authorization");

    if (token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          bayList: [
            {
              bayId: 2,
              bayNo: 10,
              bayBookedTime: [
                {
                  startTime: "2023-10-14T14:28:30.958297",
                  endTime: "2023-10-14T14:58:30.958325",
                },
                {
                  startTime: "2023-10-14T14:28:31.054667",
                  endTime: "2023-10-14T15:28:31.054678",
                },
              ],
            },
            {
              bayId: 3,
              bayNo: 1,
              bayBookedTime: [
                {
                  startTime: "2023-10-14T14:28:30.958297",
                  endTime: "2023-10-14T14:58:30.958325",
                },
                {
                  startTime: "2023-10-14T14:28:31.054667",
                  endTime: "2023-10-14T15:28:31.054678",
                },
              ],
            },
          ],
        },
        error: null,
      })
    );
  }),

  // 세차장 예약하기
  // bay가 중복되는 것 같음. body에도 있고 params에도 있고
  rest.post(
    "/carwashes/:carwash_id/bays/:bay_id/reservations",
    (req, res, ctx) => {
      const { carwash_id, bay_id } = req.params;
      const { startTime, endTime } = req.body;
      const token = req.headers.get("authorization");

      if (token) {
        return res(
          ctx.status(401),
          ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          response: null,
          error: null,
        })
      );
    }
  ),

  // 결제 후 예약내역 조회
  // 결제가 완료된 다음에 보여주는 페이지에서 호출
  // 결제가 확실히 success 되어야 보여줘야 함
  rest.get("/reservations", (req, res, ctx) => {
    const token = req.headers.get("authorization");

    if (token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          reservation: {
            time: {
              start: "2023-10-13T19:08:56.812565",
              end: "2023-10-13T19:38:56.81259",
            },
            price: 0,
            bayNo: 1,
          },
          carwash: {
            name: "세차장",
            location: {
              latitude: 10.0,
              longitude: 20.0,
            },
          },
        },
        error: null,
      })
    );
  }),

  // 현재 시간 기준 예약 내역 조회
  // 하단 예약내역 메뉴를 클릭했을 때 호출
  rest.get("/reservations/current-status", (req, res, ctx) => {
    const token = req.headers.get("authorization");

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    const responseBody = {
      success: true,
      response: {
        current: [
          {
            id: 10,
            time: {
              start: "2023-10-14T14:28:31.054667",
              end: "2023-10-14T15:28:31.054678",
            },
            carwashName: "세차장",
            bayNum: 8,
            price: 5000,
            image:
              "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
          },
          {
            id: 18,
            time: {
              start: "2023-10-14T15:10:41.498809",
              end: "2023-10-14T15:40:41.498834",
            },
            carwashName: "세차장",
            bayNum: 9,
            price: 4000,
            image:
              "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
          },
          {
            id: 22,
            time: {
              start: "2023-10-14T15:16:44.596950",
              end: "2023-10-14T15:46:44.596962",
            },
            carwashName: "세차장",
            bayNum: 10,
            price: 4000,
            image:
              "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
          },
        ],
        upcoming: [
          {
            id: 21,
            time: {
              start: "2023-10-14T20:00:00",
              end: "2023-10-14T20:30:00",
            },
            carwashName: "세차장",
            bayNum: 8,
            price: 4000,
            image:
              "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
          },
        ],
        completed: [
          {
            id: 9,
            time: {
              start: "2023-10-14T14:28:30.958297",
              end: "2023-10-14T14:58:30.958325",
            },
            carwashName: "세차장",
            bayNum: 10,
            price: 5000,
            image:
              "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
          },
          {
            id: 20,
            time: {
              start: "2023-10-14T06:00:00",
              end: "2023-10-14T06:30:00",
            },
            carwashName: "세차장",
            bayNum: 10,
            price: 4000,
            image:
              "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
          },
        ],
      },
      error: null,
    };

    return res(ctx.status(200), ctx.json(responseBody));
  }),

  // 최근 이용내역 가져오기
  // 유저의 최근 세차장 이용 내역을 가까운 날짜 순으로 5개 가져온다.
  rest.get("/reservations/recent", (req, res, ctx) => {
    const token = req.headers.get("authorization");

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          recent: [
            {
              carwashId: 3,
              image:
                "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/b214edfd-a3b7-4eb0-aaef-9dd4705ca24e",
              date: "2023-10-04",
              carwashName: "포세이돈워시 용봉점",
            },
            {
              carwashId: 4,
              image:
                "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/16b2ae1e-d904-48fc-b1e2-660b38c25c3f",
              date: "2023-10-03",
              carwashName: "셀프세차장 썬카클리닉",
            },
            {
              carwashId: 3,
              image:
                "https://github.com/Step3-kakao-tech-campus/Team10_FE_OWNER/assets/104883910/fdb8f53b-08eb-4b35-8b89-0394473c2d7b",
              date: "2023-10-02",
              carwashName: "포세이돈워시 용봉점",
            },
          ],
        },
        error: null,
      })
    );
  }),

  // 예약 취소
  rest.delete("/reservations/:reservation_id", (req, res, ctx) => {
    const { reservation_id } = req.params;
    const token = req.headers.get("authorization");

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: null,
        error: null,
      })
    );
  }),

  // 예약 수정
  rest.put("/reservations/:reservation_id", (req, res, ctx) => {
    const { reservation_id } = req.params;
    const { startTime, endTime } = req.body;

    const token = req.headers.get("authorization");

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: null,
        error: null,
      })
    );
  }),

  // 결제하기(PG)
  rest.post("/reservations/:reservation_id/payment", (req, res, ctx) => {
    const token = req.headers.get("authorization");
    const { reservation_id } = req.params;
    const { selected_date, bay_id, start_time, end_time } = req.body;

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: null,
        error: null,
      })
    );
  }),

  // 결제 완료
  rest.get("/reservations/:reservation_id/payment", (req, res, ctx) => {
    const token = req.headers.get("authorization");
    const { reservation_id } = req.params;

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않았습니다. (토큰 없음)" })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        response: {
          name: "포세이돈워시 용봉점",
          bay_no: 2,
          total_price: 30000,
          reservation_time: "예약시간",
        },
        error: null,
      })
    );
  }),
];
