import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  resultSplitArray: [],
  keyword: "",
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
    setKeyword: (state, { payload }) => {
      state.keyword = payload;
    },
  },
});

export const { setSearchResults, setResult, setResultSplit, setKeyword } =
  searchSlice.actions;
export const resultsSelector = (state) => state.search.searchResults;
export const keywordsSelector = (state) => state.search.keyword;
export const resultSplitSelector = (state) => state.search.resultSplitArray;
export default searchSlice.reducer;
