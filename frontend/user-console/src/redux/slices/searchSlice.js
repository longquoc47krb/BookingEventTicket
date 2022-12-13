import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  resultSplitArray: [],
  result: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, { payload }) => {
      state.searchResults = payload;
    },
    setResultSplit: (state, { payload }) => {
      state.resultSplitArray = payload;
    },
    setResult: (state, { payload }) => {
      state.result = payload;
    },
  },
});

export const { setSearchResults, setResult, setResultSplit } =
  searchSlice.actions;
export const resultSelector = (state) => state.search.searchResults;
export const resultSplitSelector = (state) => state.search.resultSplitArray;
export default searchSlice.reducer;
