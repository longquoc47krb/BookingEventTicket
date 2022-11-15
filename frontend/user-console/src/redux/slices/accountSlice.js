import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    userInfo: null,
    email: "",
    avatar: null,
    token: "",
    isUpdated: false,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userInfo = action.payload;
    },
    logOutAccount: (state, action) => {
      state.userInfo = null;
      state.token = null;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserAvatar: (state, { payload }) => {
      state.avatar = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setIsUpdated: (state, { payload }) => {
      state.isUpdated = payload;
    },
  },
});

export const {
  setUserProfile,
  logOutAccount,
  setEmail,
  setUserAvatar,
  setToken,
  setIsUpdated,
} = accountSlice.actions;
export const userInfoSelector = (state) => state.account.userInfo;
export const emailSelector = (state) => state.account.email;
export const tokenSelector = (state) => state.account.token;
export const userAvatarSelector = (state) => state.account.avatar;
export const isUpdatedSelector = (state) => state.account.isUpdated;
export default accountSlice.reducer;
