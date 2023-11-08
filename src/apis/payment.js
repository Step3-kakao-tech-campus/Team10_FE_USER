import { instance } from "./instance";

export const pgpayment = (bay_id, data) => {
  return instance.post(`/api/payment/ready/${bay_id}`, data);
};

export const pgapprove = (carwash_id, bay_id, data) => {
  return instance.post(`/api/payment/approve/${carwash_id}/${bay_id}`, data);
};
