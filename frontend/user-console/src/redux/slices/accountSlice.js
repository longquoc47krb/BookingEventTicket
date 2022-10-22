import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    userInfo: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userInfo = action.payload;
    },
    logOutAccount: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const { setUserProfile, logOutAccount } = accountSlice.actions;
export const userInfoSelector = (state) => state.account.userInfo;
export default accountSlice.reducer;
