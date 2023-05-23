import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    province: null,
    categoryId: null,
    status: "event.available",
    date: null,
    page: 1,
    size: 6,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setProvince: (state, { payload }) => {
      state.filter.province = payload;
    },
    setCategoryId: (state, { payload }) => {
      state.filter.categoryId = payload;
    },
    setStatus: (state, { payload }) => {
      state.filter.status = payload;
    },
    setDateType: (state, { payload }) => {
      state.filterByDateType = payload;
    },
    setStartDate: (state, { payload }) => {
      state.dateRange.start = payload;
    },
    setEndDate: (state, { payload }) => {
      state.dateRange.end = payload;
    },
    setDate: (state, { payload }) => {
      state.filter.date = payload;
    },
  },
});

export const { setProvince, setCategoryId, setStatus, setDate } =
  filterSlice.actions;
export const filterSelector = (state) => state.filter.filter;
export default filterSlice.reducer;
