import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    province: null,
    categoryId: null,
    status: null,
  },
  filterByDateType: null,
  dateRange: {
    start: "",
    end: "",
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
  },
});

export const {
  setProvince,
  setCategoryId,
  setStatus,
  setDateType,
  setStartDate,
  setEndDate,
} = filterSlice.actions;
export const filterSelector = (state) => state.filter.filter;
export const dateRangeSelector = (state) => state.filter.dateRange;
export default filterSlice.reducer;
