import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui/uiSlice";
import calendarReducer from "./calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    calendar: calendarReducer
  }
});
