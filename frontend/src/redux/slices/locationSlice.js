import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previousPathname: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setPathName: (state, action) => {
      state.previousPathname = action.payload;
    },
  },
});

export const { setPathName } = locationSlice.actions;
export const pathNameSelector = (state) => state.location.previousPathname;
export default locationSlice.reducer;
