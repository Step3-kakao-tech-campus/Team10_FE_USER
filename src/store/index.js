import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import {
  SET_BAY_ID,
  SAVE_RESERVATION,
  SET_CARWASH_ID,
  SET_RESERVATION_ID,
  RESET_STORE,
  SAVE_TID,
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
  tid: null,
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
    case SAVE_TID:
      return { ...state, tid: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reservationProcess: persistReducer(persistConfig, reducer),
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
