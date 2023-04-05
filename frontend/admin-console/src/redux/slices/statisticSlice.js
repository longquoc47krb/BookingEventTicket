import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";

const initialState = {
  eventStats: {
    previous: null,
    current: null,
  },
  ticketStats: {
    previous: null,
    current: null,
  },
  orderStats: {
    previous: null,
    current: null,
  },
  revenueStats: {
    previous: null,
    current: null,
  },
};

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setEventStats: (state, { payload }) => {
      const { date, eventQuantity } = payload;
      if (isEmpty(state.eventStats)) {
        state.eventStats.current = { date, eventQuantity };
      } else if (state.eventStats.current?.date === date) {
        state.eventStats.current = { date, eventQuantity };
      } else if (state.eventStats.current?.date !== date) {
        state.eventStats.previous = state.eventStats.current;
        state.eventStats.current = { date, eventQuantity };
      }
    },
    setTicketStats: (state, { payload }) => {
      const { date, ticketQuantity } = payload;
      if (isEmpty(state.ticketStats)) {
        state.ticketStats.current = { date, ticketQuantity };
      } else if (state.ticketStats.current?.date === date) {
        state.ticketStats.current = { date, ticketQuantity };
      } else if (state.ticketStats.current?.date !== date) {
        state.ticketStats.previous = state.ticketStats.current;
        state.ticketStats.current = { date, ticketQuantity };
      }
    },
    setOrderStats: (state, { payload }) => {
      const { date, orderQuantity } = payload;
      if (isEmpty(state.orderStats)) {
        state.orderStats.current = { date, orderQuantity };
      } else if (state.orderStats.current?.date === date) {
        state.orderStats.current = { date, orderQuantity };
      } else if (state.orderStats.current?.date !== date) {
        state.orderStats.previous = state.orderStats.current;
        state.orderStats.current = { date, orderQuantity };
      }
    },
    setRevenueStats: (state, { payload }) => {
      const { date, revenue } = payload;
      if (isEmpty(state.revenueStats)) {
        state.revenueStats.current = { date, revenue };
      } else if (state.revenueStats.current?.date === date) {
        state.revenueStats.current = { date, revenue };
      } else if (state.revenueStats.current?.date !== date) {
        state.revenueStats.previous = state.revenueStats.current;
        state.revenueStats.current = { date, revenue };
      }
    },
  },
});
export const { setEventStats, setTicketStats, setOrderStats, setRevenueStats } =
  statisticSlice.actions;
export const eventStatsSelector = (state) => state.statistic.eventStats;
export const ticketStatsSelector = (state) => state.statistic.ticketStats;
export const orderStatsSelector = (state) => state.statistic.orderStats;
export const revenueStatsSelector = (state) => state.statistic.revenueStats;
export default statisticSlice.reducer;
