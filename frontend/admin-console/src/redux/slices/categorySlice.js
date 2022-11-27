import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCategoryModal: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setShowCategoryModal: (state) => {
      state.showCategoryModal = !state.showCategory;
    },
  },
});

export const { setShowCategoryModal } = categorySlice.actions;

export default categorySlice.reducer;
