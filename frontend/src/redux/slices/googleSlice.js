import { createSlice } from "@reduxjs/toolkit";

export const googleSlice = createSlice({
  name: "google",
  initialState: {
    userInfo: null,
  },
  reducers: {
    setGoogleProfile: (state, action) => {
      state.userInfo = action.payload;
    },
    logOutGoogle: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const { setGoogleProfile, logOutGoogle } = googleSlice.actions;
export const userInfoSelector = (state) => state.google.userInfo;
export default googleSlice.reducer;
