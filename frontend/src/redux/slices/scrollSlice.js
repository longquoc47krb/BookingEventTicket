import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  yPosition: window.scrollY,
  activeSection: null,
};

const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    setYPosition(state, action) {
      state.yPosition = action.payload;
    },
    setActiveSection(state, action) {
      state.activeSection = action.payload;
    },
  },
});

export const { setYPosition, setActiveSection } = scrollSlice.actions;

export const yPositionSelector = (state) => state.scroll.yPosition;
export const activeSectionSelector = (state) => state.scroll.activeSection;
export default scrollSlice.reducer;
