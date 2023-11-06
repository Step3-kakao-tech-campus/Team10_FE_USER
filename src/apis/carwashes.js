import { instance } from "./instance";

export const carwashesRecommended = (u_latitude, u_longitude) => {
  return instance.get(
    `/api/carwashes/recommended?u_latitude=${u_latitude}&u_longitude=${u_longitude}`
  );
};

export const carwashesNearby = (u_latitude, u_longitude) => {
  return instance.get(
    `/api/carwashes/nearby?u_latitude=${u_latitude}&u_longitude=${u_longitude}`
  );
};

export const carwashesSearch = (keywordIds, u_latitude, u_longitude) => {
  return instance.get(
    `/api/carwashes/search?keywordIds=${keywordIds}&u_latitude=${u_latitude}&u_longitude=${u_longitude}`
  );
};

export const carwashesInfo = (carwash_id) => {
  return instance.get(`/api/carwashes/${carwash_id}/info`);
};

export const carwashesReviews = (carwash_id) => {
  return instance.get(`/api/carwashes/${carwash_id}/reviews`);
};

export const getReviews = () => {
  return instance.get("/api/reviews");
};

// 리뷰 포스트는 react-hook-form으로 관리할 것
export const postReviews = (data) => {
  return instance.post("/api/reviews", data);
};

export const carwashesBays = (carwash_id) => {
  return instance.get(`/api/carwashes/${carwash_id}/bays`);
};

export const bookCarwash = (carwash_id, bay_id, startTime, endTime) => {
  return instance.post(
    `/api/carwashes/${carwash_id}/bays/${bay_id}/reservations`,
    {
      startTime,
      endTime,
    }
  );
};
