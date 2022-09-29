import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EventAPI } from "../../api/configs/event";
import { fetchAllEvents } from "../../api/eventApi";
import httpRequest from "../../services/httpRequest";

export const getEvents = createAsyncThunk("event/getEvents", fetchAllEvents);
export const getEventByName = createAsyncThunk(
  "event/getEventByName",
  async (name) => {
    const res = await httpRequest(EventAPI.getEventByName(name));
    console.log("events list: ", res);
    return res;
  }
);
const initialState = {
  events: [],
  loading: true,
  selectedEvent: {},
  selectedEventName: "",
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
  },
  extraReducers: {
    [getEvents.pending]: (state) => {
      state.loading = true;
      state.events = null;
    },
    [getEvents.fulfilled]: (state, action) => {
      state.loading = false;
      state.events = action.payload.data;
    },
    [getEvents.rejected]: (state, action) => {
      state.loading = false;
    },
    [getEventByName.pending]: (state) => {
      state.loading = true;
      state.selectedEvent = null;
    },
    [getEventByName.fulfilled]: (state, action) => {
      state.loading = false;
      state.selectedEvent = action.payload.data;
    },
    [getEventByName.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { setSelectedEvent, setSelectedEventName } = eventSlice.actions;

export const selectEventById = (id) => (state) => {
  return state.event.events.find((event) => event.id === parseInt(id));
};
export const selectEventByName = (name) => (state) => {
  return state.event.events.find((event) => event.name === name);
};
export const eventsSelector = (state) => state.event.events;
export const selectedEventSelector = (state) => state.event.selectedEvent;

export default eventSlice.reducer;
