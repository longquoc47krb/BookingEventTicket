import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  result: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, { payload }) => {
      state.searchResults = payload;
    },
    setResult: (state, { payload }) => {
      state.result = payload;
    },
  },
});

export const { setSearchResults, setResult } = searchSlice.actions;
export const resultSelector = (state) => state.search.searchResults;
export default searchSlice.reducer;
