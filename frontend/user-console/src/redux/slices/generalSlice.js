import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDrawer: false,
  isFeedback: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    toggleOnDrawer: (state) => {
      state.activeDrawer = true;
    },
    toggleOffDrawer: (state) => {
      state.activeDrawer = false;
    },
    setCityName: (state, { payload }) => {
      state.cityName = payload;
    },
    setIsFeedback: (state, { payload }) => {
      state.isFeedback = payload;
    },
  },
});

export const { toggleOnDrawer, toggleOffDrawer, setIsFeedback } =
  generalSlice.actions;
export const activeDrawerSelector = (state) => state.general.activeDrawer;
export const isFeedbackSelector = (state) => state.general.isFeedback;
export default generalSlice.reducer;
