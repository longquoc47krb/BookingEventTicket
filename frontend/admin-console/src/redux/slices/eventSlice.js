import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialBackground: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setInitialBackground: (state, { payload }) => {
      state.initialBackground = payload;
    },
  },
});

export const { setInitialBackground } = eventSlice.actions;

export default eventSlice.reducer;
