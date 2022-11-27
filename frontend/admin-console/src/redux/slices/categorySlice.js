import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCategoryModal: false,
  selectedCategory: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setShowCategoryModal: (state) => {
      state.showCategoryModal = !state.showCategory;
    },
    setCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
  },
});

export const { setShowCategoryModal } = categorySlice.actions;

export default categorySlice.reducer;
