import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDrawer: false,
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
  },
});

export const { toggleOnDrawer, toggleOffDrawer } = generalSlice.actions;
export const activeDrawerSelector = (state) => state.general.activeDrawer;
export default generalSlice.reducer;
