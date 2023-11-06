// 액션 타입 정의
export const SET_CARWASH_ID = "SET_CARWASH_ID";
export const SET_BAY_ID = "SET_BAY_ID";
export const SET_RESERVATION_ID = "SET_RESERVATION_ID";
export const SAVE_RESERVATION = "SAVE_RESERVATION";
export const RESET_STORE = "RESET_STORE";
export const SAVE_CID = "SAVE_CID";

// 액션 생성자 정의

export const setCarwashId = (carwashId) => ({
  type: SET_CARWASH_ID,
  payload: carwashId,
});

export const setBayId = (bayId) => ({
  type: SET_BAY_ID,
  payload: bayId,
});

export const setReservationId = (rsvId) => ({
  type: SET_RESERVATION_ID,
  payload: rsvId,
});

export const saveReservation = (startTime, endTime) => ({
  type: SAVE_RESERVATION,
  payload: { startTime, endTime },
});

export const resetStore = () => ({
  type: RESET_STORE,
});

export const saveCid = (Cid) => ({
  type: SAVE_CID,
  payload: Cid,
});
