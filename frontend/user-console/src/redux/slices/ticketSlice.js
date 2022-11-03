import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketType: [],
  ticketCart: [],
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicketTypeArray: (state, { payload }) => {
      state.ticketType = payload;
    },
    setTicketCart: (state, { payload }) => {
      state.ticketCart = payload;
    },
    increaseTicket: (state, { payload }) => {
      const ticketItem = state.ticketType.find((item) => item.id === payload);
      ticketItem.quantity =
        ticketItem.quantity + (ticketItem.quantity < 5 ? 1 : 0);
    },
    decreaseTicket: (state, { payload }) => {
      const ticketItem = state.ticketType.find((item) => item.id === payload);
      ticketItem.quantity =
        ticketItem.quantity - (ticketItem.quantity === 0 ? 0 : 1);
    },
  },
});

export const {
  setTicketTypeArray,
  setTicketCart,
  increaseTicket,
  decreaseTicket,
} = ticketSlice.actions;
export const ticketTypeSelector = (state) => state.ticket.ticketType;
export default ticketSlice.reducer;
