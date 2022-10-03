import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishList: (state, action) => {
      console.log("index of state", state.indexOf(action.payload));
      if (state.indexOf(action.payload) === -1) {
        state = state.push(action.payload);
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
