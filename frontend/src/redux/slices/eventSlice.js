import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  selectedEvent: {},
  selectedEventName: "",
  location: "",
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    setSelectedEventName: (state, action) => {
      state.selectedEventName = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});
export const { setSelectedEvent, setSelectedEventName, setLocation } =
  eventSlice.actions;

export const eventNameSelector = (state) => state.event.selectedEventName;
export const locationSelector = (state) => state.event.location;
export const selectedEventSelector = (state) => state.event.selectedEvent;

export default eventSlice.reducer;
