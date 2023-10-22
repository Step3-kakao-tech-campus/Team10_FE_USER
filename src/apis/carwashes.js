import { instance } from "./instance";

export const carwashes_nearby = () => {
  return instance.get("/carwashes/nearby");
};
export const carwashes_search = () => {
  return instance.get("/carwashes/search");
};
export const carwashes_introduction = () => {
  return instance.get("/carwashes/introduction");
};
export const carwashes_reviews = () => {
  return instance.get("/carwashes/reviews");
};
export const reviews = () => {
  return instance.get("/reviews");
};
export const carwashes_bays = () => {
  return instance.get("/carwashes/bays");
};
