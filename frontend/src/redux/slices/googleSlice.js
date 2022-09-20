import { createSlice } from "@reduxjs/toolkit";

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
export const googleSlice = createSlice({
  name: "google",
  initialState: {
    userInfo: currentUser,
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
