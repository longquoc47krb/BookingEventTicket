import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    province: null,
    categoryId: null,
    status: null,
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
  },
});

export const { setProvince, setCategoryId, setStatus } = filterSlice.actions;
export const filterSelector = (state) => state.filter.filter;

export default filterSlice.reducer;
