import { instance } from "./instance";

export const reservations = () => {
  return instance.get("/reservations");
};
export const reservations_currentstatus = () => {
  return instance.get("/reservations/currentstatus");
};
export const reservation_recent = () => {
  return instance.get("/reservations/recent");
};
export const reservations_payment = () => {
  return instance.get("/reservations/payment");
};
