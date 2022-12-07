import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialBackground: null,
  eventId: null,
  openModal: false,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setInitialBackground: (state, { payload }) => {
      state.initialBackground = payload;
    },
    setEventId: (state, { payload }) => {
      state.eventId = payload;
    },
    setOpenModal: (state, { payload }) => {
      state.openModal = payload;
    },
  },
});

export const { setInitialBackground, setEventId, setOpenModal } =
  eventSlice.actions;
export const eventIdSelector = (state) => state.event.eventId;
export default eventSlice.reducer;
