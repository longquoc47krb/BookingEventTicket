import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCategoryModal: false,
  selectedCategory: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setShowCategoryModal: (state, { payload }) => {
      state.showCategoryModal = payload;
    },
    setCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
  },
});

export const { setShowCategoryModal } = categorySlice.actions;
export const showCategorySelection = (state) =>
  state.category.showCategoryModal;

export default categorySlice.reducer;
