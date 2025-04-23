import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import financeReducer from "./slices/financeSlice";
import teamReducer from "./slices/teamSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    finance: financeReducer,
    team: teamReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
