import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketType: [],
  ticketCart: [],
  customerOrder: null,
  totalPrice: 0,
  totalQuantity: 0,
  currentStep: 0,
  eventId: "",
  success: false,
  cancel: false,
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
      const ticketItem = state.ticketType.find(
        (item) => item.ticketName === payload
      );
      ticketItem.quantity =
        ticketItem.quantity + (ticketItem.quantity < 5 ? 1 : 0);
    },
    decreaseTicket: (state, { payload }) => {
      const ticketItem = state.ticketType.find(
        (item) => item.ticketName === payload
      );
      ticketItem.quantity =
        ticketItem.quantity - (ticketItem.quantity === 0 ? 0 : 1);
    },
    setCurrentStep: (state, { payload }) => {
      state.currentStep = payload;
    },
    setSuccess: (state, { payload }) => {
      state.success = payload;
    },
    setCancel: (state, { payload }) => {
      state.cancel = payload;
    },
    setEventId: (state, { payload }) => {
      state.eventId = payload;
    },
    setTotalPrice: (state, { payload }) => {
      state.totalPrice = payload;
    },
    setTotalQuantity: (state, { payload }) => {
      state.totalQuantity = payload;
    },
    clearCart: (state) => {
      state.ticketCart = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
    setCustomerOrder: (state, { payload }) => {
      state.customerOrder = payload;
    },
  },
});

export const {
  setTicketTypeArray,
  setTicketCart,
  increaseTicket,
  decreaseTicket,
  setCurrentStep,
  setSuccess,
  setCancel,
  setEventId,
  setTotalPrice,
  setTotalQuantity,
  clearCart,
  setCustomerOrder,
} = ticketSlice.actions;
export const ticketTypeSelector = (state) => state.ticket.ticketType;
export const ticketCartSelector = (state) => state.ticket.ticketCart;
export const currentStepSelector = (state) => state.ticket.currentStep;
export const orderSelector = (state) => state.ticket.customerOrder;
export const successSelector = (state) => state.ticket.success;
export const cancelSelector = (state) => state.ticket.cancel;
export const totalPriceSelector = (state) => state.ticket.totalPrice;
export const totalQuantitySelector = (state) => state.ticket.totalQuantity;
export const eventIdSelector = (state) => state.ticket.eventId;
export default ticketSlice.reducer;
