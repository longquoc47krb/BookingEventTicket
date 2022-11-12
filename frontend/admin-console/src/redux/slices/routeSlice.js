import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previousPathname: "",
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setPathName: (state, action) => {
      state.previousPathname = action.payload;
    },
  },
});

export const { setPathName } = routeSlice.actions;
export const pathNameSelector = (state) => state.route.previousPathname;
export default routeSlice.reducer;
