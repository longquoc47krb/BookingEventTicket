import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    province: null,
    categoryId: null,
    status: null,
  },
  filterByDateType: null,
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
  },
});

export const { setProvince, setCategoryId, setStatus, setDateType } =
  filterSlice.actions;
export const filterSelector = (state) => state.filter.filter;

export default filterSlice.reducer;
