import { instance } from "./instance";

export const pgpayment = (data) => {
  return instance.post(`/api/user/payment/ready`, data, {
    withCredentials: true,
  });
};

export const pgapprove = (data) => {
  return instance.post(`/api/user/payment/approve`, data);
};
