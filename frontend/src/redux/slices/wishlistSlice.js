import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishList: (state, action) => {
      if (state.indexOf(action.payload) !== -1) {
        state = state.concat(action.payload);
      }
    },
    removeFromWishList: (state, action) =>
      (state = state.filter((event) => !action.payload.includes(event))),
    clearWishList: (state) => {
      state = [];
    },
  },
});

export const { addToWishList, removeFromWishList, clearWishList } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
