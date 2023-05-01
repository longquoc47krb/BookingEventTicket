import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    reviewList: [],
    isCompleted: false,
    isFeedback: false,
    rating: {
      star: 5,
      message: "",
    },
    ratingArray: [],
    organizerInfo: {},
  },
  reducers: {
    setReviewList: (state, action) => {
      state.reviewList = action.payload;
    },
    setIsCompleted: (state, action) => {
      state.isCompleted = action.payload;
    },
    updateRating: (state, action) => {
      state.rating = { ...state.rating, ...action.payload };
    },
    setIsFeedback: (state, { payload }) => {
      state.isFeedback = payload;
    },
    setRatingArray: (state, { payload }) => {
      state.ratingArray = payload;
    },
    updateOrganizerInfo: (state, { payload }) => {
      state.organizerInfo = payload;
    },
  },
});

export const {
  setReviewList,
  setIsCompleted,
  updateRating,
  setIsFeedback,
  setRatingArray,
  updateOrganizerInfo,
} = eventSlice.actions;
export const reviewListSelector = (state) => state.event.reviewList;
export const organizerInfoSelector = (state) => state.event.organizerInfo;
export const isCompletedSelector = (state) => state.event.isCompleted;
export const ratingSelector = (state) => state.event.rating;
export const ratingArraySelector = (state) => state.event.ratingArray;
export const isFeedbackSelector = (state) => state.event.isFeedback;
export default eventSlice.reducer;
