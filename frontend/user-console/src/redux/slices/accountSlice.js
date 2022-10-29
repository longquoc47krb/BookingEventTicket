import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    userInfo: null,
    email: "",
    avatar: null,
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
    setUserAvatar: (state, { payload }) => {
      state.avatar = payload;
    },
  },
});

export const { setUserProfile, logOutAccount, setEmail, setUserAvatar } =
  accountSlice.actions;
export const userInfoSelector = (state) => state.account.userInfo;
export const emailSelector = (state) => state.account.email;
export const userAvatarSelector = (state) => state.account.avatar;
export default accountSlice.reducer;
