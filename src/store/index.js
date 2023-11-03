import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  SET_BAY_ID,
  SAVE_RESERVATION,
  SET_CARWASH_ID,
  SET_RESERVATION_ID,
  RESET_STORE,
} from "./action";

const persistConfig = {
  key: "root",
  storage,
};

const initialState = {
  selectedCarwashId: null,
  selectedBayId: null,
  selectedReservationId: null,
  reservations: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARWASH_ID:
      return { ...state, selectedCarwashId: action.payload };
    case SET_BAY_ID:
      return { ...state, selectedBayId: action.payload };
    case SET_RESERVATION_ID:
      return { ...state, selectedReservationId: action.payload };
    case SAVE_RESERVATION:
      return {
        ...state,
        reservations: {
          startTime: action.payload.startTime,
          endTime: action.payload.endTime,
        },
      };
    case RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
