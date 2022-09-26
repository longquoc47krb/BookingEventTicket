import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { async } from "rxjs";
import { AccountAPI } from "../../api/account";
import httpRequest from "../../services/httpRequest";

export const getAllAccounts = createAsyncThunk(
  "account/getAllAccounts",
  async () => {
    const res = await httpRequest(AccountAPI.findAllAccounts);
    return res;
  }
);
export const getAccountByEmailOrPhone = createAsyncThunk(
  "account/getAccountByEmailOrPhone",
  async (params) => {
    const res = await httpRequest(AccountAPI.findAccountByEmailOrPhone(params));
    return res;
  }
);
export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (data) => {
    const res = await httpRequest(AccountAPI.createAccount(data));
    return res;
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    userInfo: null,
    accountList: null,
    queriedUser: null,
  },
  reducers: {
    setAccountProfile: (state, action) => {
      state.userInfo = action.payload;
    },
    logOutAccount: (state, action) => {
      state.userInfo = null;
    },
  },
  extraReducers: {
    [getAllAccounts.pending]: (state, action) => {
      state.accountList = null;
    },
    [getAllAccounts.rejected]: (state, action) => {
      state.accountList = null;
    },
    [getAllAccounts.fulfilled]: (state, action) => {
      state.accountList = action.payload.data;
    },
    [createAccount.pending]: (state, action) => {
      state.userInfo = null;
    },
    [createAccount.rejected]: (state, action) => {
      state.userInfo = null;
    },
    [createAccount.fulfilled]: (state, action) => {
      state.userInfo = action.payload.data;
    },
  },
});

export const { setAccountProfile, logOutAccount } = accountSlice.actions;
export const userInfoSelector = (state) => state.account.userInfo;
export default accountSlice.reducer;
