import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, { payload }) => {
      state.searchResults = payload;
    },
  },
});

export const { setSearchResults } = searchSlice.actions;
export const resultSelector = (state) => state.search.searchResults;
export default searchSlice.reducer;
