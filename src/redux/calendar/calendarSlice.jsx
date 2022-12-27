import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: "hola",
      notes: "hello world",
      start: moment().toDate(),
      end: moment().add(2, "hour").toDate(),
      user: {
        _id: 1,
        name: "Emanuel"
      }
    }
  ],
  activeEvent: null
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    eventAddNew: (state, action) => {
      state.events.push(action.payload);
    },
    eventSetActive: (state, action) => {
      state.activeEvent = action.payload;
    },
    eventActiveClear: state => {
      state.activeEvent = null;
    },
    eventUpdate: (state, action) => {
      const { title, notes, start, end } = action.payload;
      const eventFound = state.events.find(e => e.id === action.payload.id);
      if (eventFound) {
        eventFound.title = title;
        eventFound.notes = notes;
        eventFound.start = start;
        eventFound.end = end;
      }
    },
    eventDelete: (state, action) => {
      const eventFound = state.events.find(e => e.id === action.payload.id);
      if (eventFound) {
        state.events.splice(state.events.indexOf(eventFound), 1);
      }
    }
  }
});

export const { eventAddNew, eventSetActive, eventActiveClear, eventUpdate, eventDelete } =
  calendarSlice.actions;
export default calendarSlice.reducer;
