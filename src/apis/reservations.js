import { instance } from "./instance";

export const reservations = () => {
  return instance.get("/reservations");
};
export const reservations_currentstatus = () => {
  return instance.get("/reservations/current-status");
};
export const reservation_recent = () => {
  return instance.get("/reservations/recent");
};

export const cancelReservation = (reservation_id) => {
  return instance.delete(`/reservations/${reservation_id}`);
};

export const modifyReservation = (reservation_id, startTime, endTime) => {
  return instance.put(`/reservations/${reservation_id}`, {
    startTime,
    endTime,
  });
};

export const payment = (reservation_id, data) => {
  // data = { selected_date, bay_id, start_time, end_time }
  return instance.post(`/reservations/${reservation_id}}payment`, data);
};

export const payment_result = (reservation_id) => {
  return instance.get(`/reservations/${reservation_id}/payment`);
};
