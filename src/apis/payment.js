import { instance } from "./instance";

export const pgpayment = (carwash_id, data) => {
  return instance.post(`/api/payment/ready/${carwash_id}`, data);
};

export const pgapprove = (carwash_id, bay_id) => {
  return instance.get(`/api/payment/approve/${carwash_id}/${bay_id}`);
};
