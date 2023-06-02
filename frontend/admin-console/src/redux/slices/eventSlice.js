import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialBackground: null,
  eventId: null,
  openModal: false,
  previewEvent: false,
  openTicketModal: false,
  orderEmail: "",
  openTicketByUniqueAccountModal: false,
  tickets: [],
  rating: {
    star: 5,
    message: "",
  },
  starOfThisEvent: 0,
  ratingArray: [],
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
    setOpenOrderModal: (state, { payload }) => {
      state.openModal = payload;
    },
    setPreviewEvent: (state, { payload }) => {
      state.previewEvent = payload;
    },
    setOpenTicketModal: (state, { payload }) => {
      state.openTicketModal = payload;
    },
    setTickets: (state, { payload }) => {
      state.tickets = payload;
    },
    setOpenTicketByUniqueAccountModal: (state, { payload }) => {
      state.openTicketByUniqueAccountModal = payload;
    },
    setOrderEmail: (state, { payload }) => {
      state.orderEmail = payload;
    },
    updateRating: (state, action) => {
      state.rating = { ...state.rating, ...action.payload };
    },
    setStarOfThisEvent: (state, { payload }) => {
      state.starOfThisEvent = payload;
    },
  },
});

export const {
  setInitialBackground,
  setEventId,
  setOpenOrderModal,
  setOpenTicketModal,
  setTickets,
  setPreviewEvent,
  setOpenTicketByUniqueAccountModal,
  setOrderEmail,
  updateRating,
  setStarOfThisEvent,
} = eventSlice.actions;
export const eventIdSelector = (state) => state.event.eventId;
export const previewEventSelector = (state) => state.event.previewEvent;
export const ticketsInOrderSelector = (state) => state.event.tickets;
export const orderEmailSelector = (state) => state.event.orderEmail;
export const starOfThisEventSelector = (state) => state.event.starOfThisEvent;
export default eventSlice.reducer;
