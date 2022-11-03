import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketType: [],
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicketTypeArray: (state, { payload }) => {
      state.ticketType = payload;
    },
  },
});

export const { setTicketTypeArray } = ticketSlice.actions;
export const ticketTypeSelector = (state) => state.ticket.ticketType;
export default ticketSlice.reducer;
