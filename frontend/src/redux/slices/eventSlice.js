import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EventAPI } from "../../api/configs/event";
import eventServices from "../../api/services/eventServices";
import httpRequest from "../../services/httpRequest";
const { fetchAllEvents } = eventServices;
export const getEvents = createAsyncThunk("event/getEvents", fetchAllEvents);
export const getEventByName = createAsyncThunk(
  "event/getEventByName",
  async (name) => {
    const res = await httpRequest(EventAPI.getEventByName(name));
    return res;
  }
);
const initialState = {
  events: [],
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
export const { setSelectedEvent, setSelectedEventName, setLocation } =
  eventSlice.actions;

export const selectEventById = (id) => (state) => {
  return state.event.events.find((event) => event.id === parseInt(id));
};
export const eventNameSelector = (state) => state.event.selectedEventName;
export const eventsSelector = (state) => state.event.events;
export const locationSelector = (state) => state.event.location;
export const selectedEventSelector = (state) => state.event.selectedEvent;

export default eventSlice.reducer;
