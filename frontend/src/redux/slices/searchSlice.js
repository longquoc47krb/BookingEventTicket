import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { setResults } = searchSlice.actions;
export const resultSelector = (state) => state.search.results;
export default searchSlice.reducer;
