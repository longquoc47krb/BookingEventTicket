import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketType: [],
  ticketCart: [],
  currentStep: 0,
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
    setCurrentStep: (state, { payload }) => {
      state.currentStep = payload;
    },
    nextStep: (state) => {
      state.currentStep =
        state.currentStep === 2 ? state.currentStep : state.currentStep + 1;
    },
    prevStep: (state) => {
      state.currentStep =
        state.currentStep === 0 ? state.currentStep : state.currentStep - 1;
    },
  },
});

export const {
  setTicketTypeArray,
  setTicketCart,
  increaseTicket,
  decreaseTicket,
  setCurrentStep,
  nextStep,
  prevStep,
} = ticketSlice.actions;
export const ticketTypeSelector = (state) => state.ticket.ticketType;
export const currentStepSelector = (state) => state.ticket.currentStep;
export default ticketSlice.reducer;
