import { createSlice } from "@reduxjs/toolkit";

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
export const accountSlice = createSlice({
  name: "account",
  initialState: {
    userInfo: currentUser,
  },
  reducers: {
    setAccountProfile: (state, action) => {
      state.userInfo = action.payload;
    },
    logOutAccount: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const { setAccountProfile, logOutAccount } = accountSlice.actions;
export const userInfoSelector = (state) => state.account.userInfo;
export default accountSlice.reducer;
