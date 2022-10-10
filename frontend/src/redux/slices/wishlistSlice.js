import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    addEventToWishList: (state, { payload }) => {
      const isFound = state.items.some((element) => {
        if (element.id === payload.id) {
          return true;
        }

        return false;
      });
      console.log({ isFound });
      if (!isFound) {
        state.items = state.items.concat(payload);
      }
    },
    removeEventToWishList: (state, { payload }) => {
      state.items = state.items.filter((event) => event.id !== payload);
    },
    clearWishList: (state) => {
      state.items = [];
    },
  },
});

export const { addEventToWishList, removeEventToWishList, clearWishList } =
  wishlistSlice.actions;

export const wishlistSelector = (state) => state.wishlist.items;

export default wishlistSlice.reducer;
