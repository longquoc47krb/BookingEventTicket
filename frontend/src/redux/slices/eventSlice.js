import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EventAPI } from "../../api/event";
import httpRequest from "../../services/httpRequest";

export const getEvents = createAsyncThunk("event/getEvents", async () => {
  const res = await httpRequest(EventAPI.getAllEvents);
  console.log("events list: ", res);
  return res;
});
export const getEventByName = createAsyncThunk(
  "event/getEventByName",
  async (name) => {
    const res = await httpRequest({
      url: `${EventAPI.getEventByName.url}${name}`,
      method: EventAPI.getEventByName.method,
    });
    console.log("events list: ", res);
    return res;
  }
);
const initialState = {
  events: [],
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
      state.events = null;
    },
    [getEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
    },
    [getEventByName.pending]: (state) => {
      state.selectedEvent = null;
    },
    [getEventByName.fulfilled]: (state, action) => {
      state.selectedEvent = action.payload;
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
export const selectedEventSelector = (state) => state.event.selectedEvent;

export default eventSlice.reducer;
