import { instance } from "./instance";

export const reservations = () => {
  return instance.get("/reservations");
};
// 나중에 api 수정되면 이거로 바꾸기
// export const reservations = (reservationId) => {
//   return instance.get(`/reservations/${reservationId}`);
// };
export const reservationsCurrentstatus = () => {
  return instance.get("/api/reservations/current-status");
};
export const reservationsRecent = () => {
  return instance.get("/api/reservations/recent");
};

export const cancelReservation = (reservation_id) => {
  return instance.delete(`/api/reservations/${reservation_id}`);
};

export const modifyReservation = (reservation_id, startTime, endTime) => {
  return instance.put(`/api/reservations/${reservation_id}`, {
    startTime,
    endTime,
  });
};

export const payment = (reservation_id, data) => {
  // data = { selected_date, bay_id, start_time, end_time }
  return instance.post(`/api/reservations/${reservation_id}}payment`, data);
};

export const paymentResult = (reservation_id) => {
  return instance.get(`/api/reservations/${reservation_id}/payment`);
};
