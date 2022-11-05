import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setWishlist: (state, { payload }) => {
      state.wishlist = payload;
    },
  },
});

export const { setWishlist } = customerSlice.actions;
export const wishlistSelector = (state) => state.customer.wishlist;
export default customerSlice.reducer;
