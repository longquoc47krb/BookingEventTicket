import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
});

export const {} = eventSlice.actions;

export default eventSlice.reducer;
