import { configureStore } from "@reduxjs/toolkit";
import googleReducer from "./slices/googleSlice";

export default configureStore({
  reducer: {
    google: googleReducer,
  },
});
