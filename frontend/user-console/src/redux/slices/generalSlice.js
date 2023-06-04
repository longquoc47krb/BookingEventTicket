import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDrawer: false,
  ticketSearchList: [],
  keywordsArray: [],
  searchText: "",
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    toggleOnDrawer: (state) => {
      state.activeDrawer = true;
    },
    toggleOffDrawer: (state) => {
      state.activeDrawer = false;
    },
    setTicketSearchList: (state, { payload }) => {
      state.ticketSearchList = payload;
    },
    setKeywordsArray: (state, { payload }) => {
      state.keywordsArray = payload;
    },
    setSearchText: (state, { payload }) => {
      state.searchText = payload;
    },
  },
});

export const {
  toggleOnDrawer,
  toggleOffDrawer,
  setTicketSearchList,
  setKeywordsArray,
  setSearchText,
} = generalSlice.actions;
export const activeDrawerSelector = (state) => state.general.activeDrawer;
export const ticketSearchListSelector = (state) =>
  state.general.ticketSearchList;
export const keywordsArraySelector = (state) => state.general.keywordsArray;
export const searchTextSelector = (state) => state.general.searchText;
export default generalSlice.reducer;
