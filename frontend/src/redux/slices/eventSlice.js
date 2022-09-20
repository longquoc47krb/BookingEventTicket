import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "../../services/httpRequest";

export const getEvents = createAsyncThunk("event/getEvents", async () => {
  const res = await httpRequest({
    url: "/events",
    method: "GET",
  });
  return res;
});
export const getEventById = createAsyncThunk(
  "event/getEventById",
  async (id) => {
    const res = await httpRequest({
      url: "/events",
      method: "GET",
      params: {
        id,
      },
    });
    return res;
  }
);
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
    [getEventById.pending]: (state) => {
      state.selectedEvent = {};
    },
    [getEventById.fulfilled]: (state, action) => {
      state.selectedEvent = action.payload;
    },
    [getEvents.pending]: (state) => {
      state.events = null;
    },
    [getEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
    },
  },
});
export const { setSelectedEvent } = eventSlice.actions;
export const selectedEventSelector = (state) => state.event.selectedEvent;

export default eventSlice.reducer;
