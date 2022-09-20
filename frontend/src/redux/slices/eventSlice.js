import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EventAPI } from "../../api/event";
import httpRequest from "../../services/httpRequest";

export const getEvents = createAsyncThunk("event/getEvents", async () => {
  const res = await httpRequest(EventAPI.getAllEvents);
  console.log("events list: ", res);
  return res;
});
const initialState = {
  events: [],
  selectedEvent: {},
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
  extraReducers: {
    [getEvents.pending]: (state) => {
      state.events = null;
    },
    [getEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
    },
  },
});
export const { setSelectedEvent } = eventSlice.actions;

export const selectEventById = (id) => (state) => {
  return state.event.events.find((event) => event.id === parseInt(id));
};
export const selectedEventSelector = (state) => state.event.selectedEvent;

export default eventSlice.reducer;
