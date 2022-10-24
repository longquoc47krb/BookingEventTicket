import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    userInfo: null,
    email: "",
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userInfo = action.payload;
    },
    logOutAccount: (state, action) => {
      state.userInfo = null;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setUserProfile, logOutAccount, setEmail } = accountSlice.actions;
export const userInfoSelector = (state) => state.account.userInfo;
export const emailSelector = (state) => state.account.email;
export default accountSlice.reducer;
