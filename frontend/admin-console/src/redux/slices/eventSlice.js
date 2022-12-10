import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialBackground: null,
  eventId: null,
  openModal: false,
  openTicketModal: false,
  tickets: [],
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
    setOpenTicketModal: (state, { payload }) => {
      state.openTicketModal = payload;
    },
    setTickets: (state, { payload }) => {
      state.tickets = payload;
    },
  },
});

export const {
  setInitialBackground,
  setEventId,
  setOpenModal,
  setOpenTicketModal,
  setTickets,
} = eventSlice.actions;
export const eventIdSelector = (state) => state.event.eventId;
export const ticketsInOrderSelector = (state) => state.event.tickets;
export default eventSlice.reducer;
