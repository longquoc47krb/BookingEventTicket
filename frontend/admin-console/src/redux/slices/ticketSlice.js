import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openTicketModal: false,
  event: null,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setOpenTicketModalInTickets: (state, { payload }) => {
      state.openTicketModal = payload;
    },
    setEventInTickets: (state, { payload }) => {
      state.event = payload;
    },
  },
});

export const { setOpenTicketModalInTickets, setEventInTickets } =
  ticketSlice.actions;
export const openTicketModalSelector = (state) => state.ticket.openTicketModal;
export const eventInTicketsSelector = (state) => state.ticket.event;
export default ticketSlice.reducer;
