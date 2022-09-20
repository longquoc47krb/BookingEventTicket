import { configureStore } from "@reduxjs/toolkit";
import googleReducer from "./slices/googleSlice";
import eventReducer from "./slices/eventSlice";
export default configureStore({
  reducer: {
    google: googleReducer,
    event: eventReducer,
  },
});
